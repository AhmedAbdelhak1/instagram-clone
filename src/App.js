import React,{useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';


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
  const [openSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [user, setUser] = useState(null);

useEffect(() => {
 const unsebscribe = auth.onAuthStateChanged((authUser)=>{
    if (authUser){
      setUser(authUser);

      

    } else {
      setUser(null);
    }
  })
  return () =>{
    unsebscribe();
  }
}, [user, username]);




  useEffect(() =>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      }) ));
    })
  },[]);

  const signUp = (event) =>{
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(error => alert(error.message));
      setOpen(false)

  }
  const signIn = (event) =>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
      .catch((error)=> alert(error.message));
    
    setOpenSignIn(false);
  }

  return (
    <div className="app">

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to log in to upload</h3>
      )}

      


      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/> 
              </center>
                <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
               
                <Button type="sumbit" onClick={signUp} >Sign Up</Button>
            </form>
          
     
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/> 
              </center>
                
                <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
               
                <Button type="sumbit" onClick={signIn} >Sign In</Button>
            </form>
          
     
        </div>
      </Modal>



      
      <div className="app__header">
      <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>

      </div>
      { user ? (
          <Button onClick={()=> auth.signOut()}>Logout</Button>
       ) : (
        <div className="app__loginContainer" >
          <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=> setOpen(true)}>Sign up</Button>
        </div>
       )}
     
      <h1>Instagram clone with react!!!</h1>

    {posts.map( ({id, post}) =>( 
      <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
    ))}

     
      
    </div>
  );
}

export default App;
