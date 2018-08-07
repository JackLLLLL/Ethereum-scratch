import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import './app.css'

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
        var random_num = Math.floor(Math.random()*3);
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