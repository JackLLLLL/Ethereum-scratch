import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3"
import Tx from "ethereumjs-tx";
import 'antd/dist/antd.css';
import './app.css'
import config from "../eth/eth_config"

import { Timeline, Icon, Avatar, Badge, Button } from 'antd';


class App extends React.Component {
    state = {
        loading: true,
        eth_balance: 0,
        prize_won: 0,
    }

    // setStateAsync (state) {
    //     return new Promise ((resolve) => {
    //         this.setState(state, resolve)
    //     })
    // }

    // enterLoading = () => {
    //     this.setState({loading: true});
    // }

    // finishLoading = () => {
    //     this.setState({loading: false});
    // }

    async getPrizeFromEth(tokenId) {
        var abi = JSON.parse(config.CONTRACT_ABI);
        var contract_address = config.CONTRACT_ADDRESS;
        var from_address = config.FROM_ADDRESS;
        var web_privatekey = config.WEB_PRIVATEKEY;

        console.log("input parameters is "  + tokenId)
        console.log(contract_address)
        console.log(from_address)
        console.log(web_privatekey)

        let web3;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider, infura
            web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/cLuV2VMPUEHUVLATbUfK"));
        }

        // This code was written and tested using web3 version 1.0.0-beta.35, but appears to be 0.20, haven't figure out why, so using 0.20 grammer in following
        console.log(`web3 version: ${web3.version}`)
        // console.log(`web3 version: ${web3.version.api}`)

        // Determine the nonce
        var count = await web3.eth.getTransactionCount(from_address);
        console.log(`transactions so far: ${count}`);

        // This is the address of the contract
        var contract = new web3.eth.Contract(abi, contract_address, { from: from_address });
        // var contract = web3.eth.contract(abi);
        // var contract_instance = contract.at(contract_address);

        // check the balance
        var balance = await web3.eth.getBalance(from_address);
        console.log(`Ether Balance before send: ${balance} Wei`);

        // default chainId
        var id =  await web3.eth.net.getId();
        // var id = await web3.version.network;
        console.log(`chainId: ${id}`)

        // esimate gas price
        var gasPrice = await web3.eth.getGasPrice();
        // var gasPrice = await web3.eth.gasPrice;
        console.log(`gas price: ${gasPrice}`)

        // esimate gas consume
        var gasConsume = await web3.eth.estimateGas({
            from: from_address,
            to: contract_address,
            data: contract.methods.prizeOf(tokenId).encodeABI()
        }) * 2
        console.log(`gas consume: ${gasConsume}`)
        console.log(`total: ${gasPrice*gasConsume}`)

        // call
        var receipt = await contract.methods.prizeOf(tokenId).call({from: from_address, gasPrice: gasPrice, gas:gasConsume});

        console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`)

        // The balance may not be updated yet, but let's check
        balance = await web3.eth.getBalance(from_address);
        console.log(`Ether Balance after send: ${balance} Wei`);

        // // create raw transaction
        // var rawTransaction = {
        //     "from": from_address,
        //     "nonce": "0x" + count.toString(16),
        //     "gasPrice": web3.utils.toHex(gasPrice),
        //     "gasLimit": web3.utils.toHex(gasConsume),
        //     "to": contract_address,
        //     "value": "0x0",
        //     "data": contract.methods.prizeOf(tokenId).encodeABI(),
        //     "chainId": id
        // };

        // console.log(rawTransaction)
        // console.log(`total: ${gasPrice*gasConsume}`)
        // // The private key must be for from_address
        // var privateKey = new Buffer(web_privatekey, 'hex');
        // var tx = new Tx(rawTransaction);
        // // sign the transaction
        // tx.sign(privateKey);
        // var serializedTx = tx.serialize();

        // // send the transaction
        // console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
        // var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        // console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

        // // The balance may not be updated yet, but let's check
        // balance = await contract.methods.balanceOf(from_address).call();
        // console.log(`JackCoin Balance after send: ${balance}`);
        // balance = await web3.eth.getBalance(from_address);
        // console.log(`Ether Balance after send: ${balance} Wei`);
        
        return receipt
    }

    async componentDidMount() {
        console.log("component mounted")

        // forbid dragging body
        var body_style = document.body.style; 
        body_style.mozUserSelect = 'none'; 
        body_style.webkitUserSelect = 'none';

        // canvas
        var canvas = document.querySelector('canvas');
        // canvas.style.position = 'absolute';

        // img as background
        var img = new Image();
        // TODO: need to get random number from Ethereum
        var imgs = ['images/0.jpg','images/1.jpg','images/2.jpg'];
        var random_num = await this.getPrizeFromEth(0);
        img.src = imgs[random_num];

        img.addEventListener('load', function(e) {
            var context;
            var width = img.width,
                height = img.height;
            var offset_x = canvas.offsetLeft,
                offset_y = canvas.offsetTop;
            var mouse_down = false;
    
            // mouse event functions
            function eventDown(e) {
                e.preventDefault();
                mouse_down = true;
            }
    
            function eventUp(e) {
                e.preventDefault();
                mouse_down = false;
            }
    
            function eventMove(e) {
                e.preventDefault();
                if (mouse_down) {
                    if(e.changedTouches) {
                        e = e.changedTouches[0];
                    }

                    var x = (e.clientX + document.body.scrollLeft || e.pageX) - offset_x || 0,
                    y = (e.clientY + document.body.scrollTop || e.pageY) - offset_y || 0;

                    // console.log(e.clientX, "clientx")
                    // console.log(e.pageX, "pagex")
                    // console.log(document.body.scrollLeft, "doc")
                    // console.log(offset_x, "offx")


                    context.beginPath();
                    context.arc(x, y, 15, 0, Math.PI * 2);
                    context.fill();
                }
            }
    
            // set background image
            canvas.width = width;
            canvas.height = height;
            canvas.style.backgroundImage = 'url('+img.src+')';

            // draw a silver rectangle to cover prize
            context = canvas.getContext('2d');
            context.fillStyle = 'slategray';
            context.fillRect(280, 268, 295, 160);
            
            // remove cover
            context.globalCompositeOperation = 'destination-out';

            // canvas.addEventListener('touchstart', eventDown);
            // canvas.addEventListener('touchend', eventUp);
            // canvas.addEventListener('touchmove', eventMove);
            canvas.addEventListener('mousedown', eventDown);
            document.addEventListener('mouseup', eventUp);
            canvas.addEventListener('mousemove', eventMove);
    
        });     
    }

    // async handleClick(event) {
    //     event.preventDefault()

    //     await this.enterLoading()
        
    //     const res = await fetch ("https://api.github.com/orgs/ionlyloveresearch/events", {
    //         cache: 'no-cache', 
    //         headers: {
    //             'user-agent': 'Mozilla/4.0 Jack',
    //             'content-type': 'application/json'
    //         },
    //         method: 'GET', 
    //         mode: 'cors', 
    //         redirect: 'follow', 
    //         referrer: 'no-referrer', 
    //     })

    //     const events = await res.json()

    //     await this.setStateAsync({events: events, loading: false, badge_count: 0})
    // }

    purchase (e) {
        e.preventDefault();

        window.location.reload();

    }

    render () {
        // console.log(this.state)

        // var timelineItems = [];
        // var agains_created = '';
        // var agains_edited = '';
        // for (var i=this.state.events.length-1; i > -1; i--) {
        //     // console.log(i)
        //     // console.log(this.state.events[i])
        //     if (this.state.events != {} && this.state.events[i].type == 'GollumEvent') {
        //         if (this.state.events[i].payload.pages[0].action == 'created') {
        //             let previousEvent = thisEvent;
        //             let thisEvent = this.state.events[i];
        //             if (previousEvent != undefined && thisEvent.actor.id === previousEvent.actor.id) {
        //                 agains_created += '又'
        //             } else {
        //                 agains_created = ''
        //             }
        //             timelineItems.unshift(<Timeline.Item dot={<Avatar size="default" src={thisEvent.actor.avatar_url} />} >
        //                                         <span style={{ fontSize: 10, color: "#C8C2BB" }}> &nbsp;&nbsp;{new Date(thisEvent.created_at).getYear()+1900}年
        //                                             {new Date(thisEvent.created_at).getMonth()+1}月{new Date(thisEvent.created_at).getDate()}日
        //                                             {new Date(thisEvent.created_at).getHours()}:{new Date(thisEvent.created_at).getMinutes()}:{new Date(thisEvent.created_at).getMinutes()} </span> <br />
        //                                         {thisEvent.actor.display_login}同学{agains_created}读了一篇paper啦!~ <br />
        //                                         TA在github的{thisEvent.repo.name.split('/')[1]} repo里创建了题目是<a href={thisEvent.payload.pages[0].html_url}> {thisEvent.payload.pages[0].title} </a>的精致分析~ 快去看看吧~ <br />
        //                                     </Timeline.Item>);
        //         } else if (this.state.events[i].payload.pages[0].action == 'edited') {
        //             let previousEvent = thisEvent;
        //             let thisEvent = this.state.events[i];
        //             if (previousEvent != undefined && thisEvent.payload.pages[0].html_url === previousEvent.payload.pages[0].html_url) {
        //                 agains_edited += '又'
        //             } else {
        //                 agains_edited = ''
        //             }
        //             timelineItems.unshift(<Timeline.Item dot={<Avatar size="default" src={thisEvent.actor.avatar_url} />} >
        //                                         <span style={{ fontSize: 10, color: "#C8C2BB" }}> &nbsp;&nbsp;{new Date(thisEvent.created_at).getYear()+1900}年
        //                                             {new Date(thisEvent.created_at).getMonth()+1}月{new Date(thisEvent.created_at).getDate()}日
        //                                             {new Date(thisEvent.created_at).getHours()}:{new Date(thisEvent.created_at).getMinutes()}:{new Date(thisEvent.created_at).getMinutes()} </span> <br />
        //                                         {thisEvent.actor.display_login}同学在github的{thisEvent.repo.name.split('/')[1]}repo里{agains_edited}修改了<a href={thisEvent.payload.pages[0].html_url}> {thisEvent.payload.pages[0].title} </a>页面~ <br />
        //                                     </Timeline.Item>);
        //         }
        //     }
        // }

        return (
                <div id="scratch">
                    <div class="msg" style={{ textAlign: 'center', fontSize: 'large' }}>
                        刮开看看是否中奖了~ 
                    </div>

                    <div class="card" style={{ textAlign: 'left' }}>
                        <canvas></canvas>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" icon="rocket" onClick={ this.purchase.bind(this) }>Buy a new stracth !</Button>
                    </div>
                </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))