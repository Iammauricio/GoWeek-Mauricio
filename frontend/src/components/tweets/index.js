import React,{Component}  from 'react';
import like from './like.svg';
import api from '../../services/api';
import './index.css';

export default class Tweets extends Component {
    state = {
        animatios:''
    }

    handleLike = async () => {
        const { _id } = this.props.tweet;
        await api.post(`/likes/${_id}`);
        await this.setState({
            animation : 'animation'
        })

        
         
        
    }
    render(){
        const { tweet} = this.props;
        return(
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type="button" className={this.state.animation} onClick={this.handleLike}>
                    
                    <img className="icon-like" src={like} alt="like" />
                     {tweet.likes}
                </button>
            </li>
        )
    }
}