import React,{useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [posts, setPosts]= useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  useEffect(() =>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      }) ));
    })
  },[]);

  const signUp = (event) =>{

  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
            <form>
              <center>
                <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/> 
              </center>
                <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={signUp} >Login</Button>
            </form>
          
     
        </div>
      </Modal>
      
      <div className="app__header">
      <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>

      </div>
      <Button onClick={()=> setOpen(true)}>Sign up</Button>
      <h1>Instagram clone with react!!!</h1>

    {posts.map( ({id, post}) =>( 
      <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
    ))}

     
      
    </div>
  );
}

export default App;
