import React from 'react';
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { FcStackOfPhotos } from 'react-icons/fc'

import shareVideo from '../assets/video-login.mp4';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate()

  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture, sub } = decoded

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', {replace: true})
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 flex items-center justify-center">
            <FcStackOfPhotos size={`48px`} />
            <h1 className='text-primary font-bold text-2xl'>LOOK</h1>
          </div>
            <GoogleLogin 
              onSuccess={(response) => 
                responseGoogle(response)
              }
              onError={() => 
                console.log('ERROR')
              }
              cookiePolicy={'single_host_origin'}
              
            />
        </div>
      </div>
    </div>
  );
};

export default Login;