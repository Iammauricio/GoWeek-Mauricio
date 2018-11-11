import React, { Component} from 'react';
import twitterLogo from '../../twitter.svg';
import api from '../../services/api';
import socket from 'socket.io-client';
import './index.css';
import Tweets from '../../components/tweets/index';

export default class Login extends Component {
    state = {
        twets: [],
        newTweet: '',

    }

    async componentDidMount(){
        this.subscribeToEvents();

        const response = await api.get('tweets');
        this.setState({
            twets: response.data
        });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');
        io.on('tweet',data => {
            this.setState({
                twets: [data, ...this.state.twets]
            })
        })
        io.on('like',data => {
            this.setState({
                twets : this.state.twets.map( tweet => tweet._id === data._id ?  data : tweet)
            });
        })
    }

    handleNewTweet = async e => {
        if(e.keyCode !== 13) return;
        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');
        await api.post('/tweets',{ content , author});

        this.setState({
            newTweet:''
        })
    }

    handleInputChange = (e) => {
        this.setState({
            newTweet: e.target.value
        })
    }
    render(){
        return (
            <div className="timeline-wrapper">
             <img height={24} src={twitterLogo} alt="GoTwitter" />
                <form>
                    <textarea 
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?">
                     </textarea>
                </form>
                <ul className="tweet-list" >
                    {
                        this.state.twets.map( tweet => (
                            <Tweets  key={tweet._id} tweet={tweet}/>
                        ))
                    }
                </ul>
                
            </div>
        );
    }
}