import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserImage from '../../../common/UserImage';
// import Summary from '../../summary/Summary';
import Favorites from './Favorites';
import Delete from './Delete';
import Update from './Update';
import Tags from './Tags';
import { getReadingById } from '../selectors';
import BreadsImage from '../../../images/breads-wesual-click.jpg'

const ListItem = props => {
    const { id, style, list, users, reading, summary, currentUser, outdated, tags } = props;
    
    const minutes = Math.round(reading.word_count / 300);

    // use images.webserv.nl to serve http images as https
    let backgroundImg = '';
    if (reading && reading.reading_image) {
        backgroundImg = `https://images.weserv.nl/?url=${reading.reading_image}&w=167&output=webp`;
        // backgroundImg = reading.reading_image.includes('http://') ? `https://images.weserv.nl/?url=${reading.reading_image}&output=png` : reading.reading_image
    }
    
    return (
        <li 
            style={{
                ...style,
                // backgroundImage: `url(${backgroundImg || BreadsImage})`,
                // backgroundSize: 'cover'
            }}
            className='card border-secondary'
            id='list-item'
            // className='list-group-item p-0 overflow-hidden'
        >
            <div className='row'>
                {/* <div className='h-100 special d-flex flex-column justify-content-around m-1 p-2'> */}
                <div className='col-md-4'>
                    <img loading='lazy' src={backgroundImg || BreadsImage} className='card-img m-3' alt='Article'></img>
                </div>
                <div className='col-md-8'>
                    <div className='m-3'>
                        <h5 className='card-title flex-row'><a href={`${reading.url}`} target='_blank' rel='noopener noreferrer' className='text-primary'><strong>{reading.title}</strong></a></h5>
                        <div className='card-text flex-row small'>{reading.description}</div>
                        <div className='card-text row ml-1 mr-1 mt-2'>
                            <p className='lead'>{reading.domain}</p>
                            { minutes > 0 && <p className='text-muted ml-auto'>{minutes} min read</p> }          
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='row'> */}
                <div className='card-text row flex-nowrap ml-3 mr-3'>
                    <UserImage
                        image={users[reading.reader].image}
                        username={users[reading.reader].username}
                        className='timeline-image'
                        height='48'
                        width='48'
                    />

                    {!props.isCorrectUser && 
                        <Link to={`/${users[reading.reader].id}`} className='btn text-primary m-2'>
                            <small>{users[reading.reader].username}</small>
                        </Link>    
                    }

                    <Moment className='text-muted text-nowrap mt-3 ml-2 mr-auto' fromNow ago>
                        {reading.created_at}
                    </Moment> 

                    {/* {minutes > 0 && 
                        <Summary id={id}/>
                    } */}
                    {tags && 
                        <Tags reading={reading} tags={tags} list={list}/>
                    }
                    {(list !== 'global' && list !== 'subscriptions') &&
                        <>
                            <Favorites id={id} reader={reading.reader} favorite={reading.favorite}/>
                            <Delete id={id} reader={reading.reader}/>
                        </>
                    }

                    {summary.id === reading.id &&
                        <p className='summary-data'>{summary.data}</p>
                    }

                    {(currentUser.user.id === reading.reader || currentUser.user.id === 1)&& 
                    outdated === 'true' &&
                        <Update user_id={reading.reader} reading_id={id} url={reading.url}/>
                    }
                </div>
            {/* </div> */}
        </li>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
        reading: getReadingById(state, ownProps.list, ownProps.id),
        currentUser: state.currentUser,
        summary: state.summary,
        tags: state.tags
    }
}

export default connect(mapStateToProps)(ListItem);