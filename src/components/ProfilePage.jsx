import React, { useEffect, useState } from 'react'
import './profilepage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ProfilePage() {
  // const { user, loading } = useAuthContext()
  const navigate = useNavigate()

  const [userData, setUserdata] = useState({})
  const [profilePic, setProfilePic] = useState('')
  const [imageBase64, setImageBase64] = useState('');
  
  // const getProfileData = () => {
  //   axios.get(`${process.env.REACT_APP_SERVER_URL}/getProfileData/${cookies.get('user')}`)
  //     .then(user => {
  //       setProfilePic(user.data.profilePic)
  //       setUserdata(user.data)})
  //     .catch(err => console.log(err));

  //     console.log(userData)
  // }

  // useEffect(() => {
  //   if (!loading && !user) navigate("/");
  //   getProfileData()
  // }, [user, navigate, loading])


  // useEffect(() => {
  //   if (profilePic && profilePic !== ""){
  //     axios.post(`${process.env.REACT_APP_SERVER_URL}/profileImageUpdate`, {'image':profilePic, 'user': cookies.get('user')})
  //     // .then(() => alert("Image Updated successfully!"))
  //     .catch(err => {
  //       alert("Unsuccessful! Ran into error  " + err);
  //       console.log(err)
  //     })
  //   }
    
  // }, [profilePic])

  // useEffect(() => {
  //   setProfilePic(imageBase64)
  // }, [imageBase64])

  // useEffect(() => {
  //   const inputFields = document.querySelectorAll('input');
  //   inputFields.forEach(field => {
  //     if (field.name in userData && field.name !== 'profilePic') {
  //       field.value = userData[field.name]
  //     }
  //   })
  //   const textAreas = document.querySelectorAll('textarea');
  //   textAreas.forEach(field => {
  //     if (field.name in userData && field.name !== 'profilePic') {
  //       field.value = userData[field.name]
  //     }
  //   })
  //   console.log(userData)
  // },[userData])

  const imageChange = (event) => {
    console.log('test')
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    if (file) {
          reader.readAsDataURL(file); // Convert the file to Base64
    }
  
}

  // const imageChange = (event) => {
  //   console.log('test')
  //   const file = event.target.files[0]
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImageBase64(reader.result);
  //     // console.log(imageBase64) // The Base64 string of the image
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file); // Convert the file to Base64
  //   }

  //   axios.post(`${process.env.REACT_APP_SERVER_URL}/profileImageUpdate`, {'image':imageBase64, 'user': cookies.get('user')})
  //   .then(() => alert("Image Updated successfully!"))
  //   .catch(err => {
  //     alert("Unsuccessful! Ran into error  " + err);
  //     console.log(err)
  //   })

  // }
  
  const updateUserData = (userValues) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/profileUpdate`, {'userData': userValues, 'user': cookies.get('user')})
    .then(() => alert("User Updated successfully!"))
    .catch(err => {
      alert("Unsuccessful! Ran into error  " + err);
      console.log(err)
    })
  }

  const handleSave = () => {
    const inputFields = document.querySelectorAll('input');
    const textAreas = document.querySelectorAll('textArea');
    const userValues = {} 
    inputFields.forEach(input => {
      if(input.name !== 'profilePic'){
          userValues[input.name] = input.value
      }
      else{
       userValues[input.name] = profilePic
      }
    });

    textAreas.forEach(input => {
      userValues[input.name] = input.value
    });
    
    console.log(userValues)
    updateUserData(userValues)

    textAreas.forEach(input => {
      input.disabled = true
    });

    inputFields.forEach(input => {
      input.disabled = true
    });
  } 

  const handleEdit = () => {
    const inputFields = document.querySelectorAll('input');
    const textAreas = document.querySelectorAll('textArea'); 

    textAreas.forEach(input => {
      input.disabled = false
    });

    inputFields.forEach(input => {
      input.disabled = false
    });
  } 

  return (
    <div>
    <div>
    {/* {loading ? (
        <Loading />
      ) : (
      <div className="flex flex-col min-h-screen scroll-y">
        <div className='navbar'>
          <Navbar selectedItem={'profilePage'}/> */}
        </div>
        <div className='no-select header'>
          <img src='nulogo_transparent.png' id='logo'></img>
          <h1>Alumni Dashboard</h1>
        </div>
      <div className='columns-2 flex flewWrap flexMargin scroll-y profile-box'>
        <div className="flex flexWrap lg:w-1/2" id='column1' style={{flexDirection: "column"}}>
         <img className='image' name="profilePic" 
                src={profilePic}
                alt="Profile"
              />
          <input id="profilePicture" onChange={imageChange} style={{display:"none"}} type="file" name="profilePic" className='change-picture'></input>
          <label htmlFor="profilePicture" className='change-picture'>Change Picture</label>
          <div className='flex flex-wrap' style={{justifyContent:"center"}}>
              <div className='form-box profile-form-box flex'>
              <label className='text-weight profileLabel'>Name</label>
              <input disabled className='createuser-field' type="text" name="name" placeholder='Enter Full Name'/>
              </div>
              <div className='form-box profile-form-box flex'>
              <label style={{}} className='text-weight profileLabel'>Contact</label>
              <input disabled className='createuser-field' type="text"  name="contact" placeholder='Enter Contact Number'/>
              </div>
              <div className='form-box profile-form-box flex'>
              <label className='text-weight profileLabel'>Email</label>
              <input disabled className='createuser-field' type="text"  name="email" placeholder='Enter Email ID'/>
              </div>
              <div className='form-box profile-form-box flex'>
              <label className='text-weight profileLabel'>LinkedIn</label>
              <input disabled className='createuser-field' type="text"  name="linkedin" placeholder='Enter LinkedIn Link'/>
              </div>
              <div className='form-box profile-form-box flex'>
              <label className='text-weight profileLabel'>Country</label>
              <input disabled className='createuser-field' type="text"  name="country" placeholder='Enter Country'/>
              </div>
              <div className='form-box profile-form-box flex'>
              <label className='text-weight profileLabel'>City</label>
              <input disabled className='createuser-field' type="text"  name="city" placeholder='Enter City'/>

              </div>

        </div>
        </div>
        <div className="flex flexWrap lg:w-1/2" id='column2' style={{flexDirection: "column"}}>
        <div className='flex flex-wrap' style={{justifyContent:"center"}}>

        <div className='form-box profile-form-box flex'>
        <label className='text-weight profileLabel'>Batch</label>
        <input disabled className='createuser-field' type="text"  name="gradYear" placeholder='Enter Graduating Year'/>
        </div>
        <div className='form-box profile-form-box flex'>
        <label className='text-weight profileLabel'>Degree</label>
        <input disabled className='createuser-field' type="text"  name="degree" placeholder='Enter Degree'/>
        </div>
        
        <div className='form-box profile-form-box flex'>
        <label className='text-weight profileLabel'>Specialization</label>
        <input disabled className='createuser-field' type="text" name="specialization" placeholder='Enter Specialization'/>
        </div>
        </div>
        <label className='text-weight profileLabel'>About You</label>
        <textarea disabled className='profile-textArea' type="text" name="about" placeholder='About You'/>
        <label className='text-weight profileLabel'>Career History</label>
        <textarea disabled className='profile-textArea' type="text" name="career" placeholder='Describe Career History'/>
        <div>
        <button type="button" onClick={handleSave} className='profile-button' style={{marginLeft: "27%"}}>Save</button>
        <button type="button" onClick={handleEdit} className='edit-button' style={{marginLeft: "15%"}}>Edit</button>
        </div>
        </div>
      </div>
    </div>
  )
}