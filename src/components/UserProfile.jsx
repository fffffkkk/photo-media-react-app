import React, {useState, useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useParams, useNavigate } from 'react-router-dom'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology,photo'
const activeBtnStyles = 'bg-red-500 text-white font-bold rounded-full p-2 w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black rounded-full p-2 w-20 outline-none'

const UserProfile = () => {
	const [user, setUser] = useState(null)
	const [pins, setPins] = useState(null)
	const [text, setText] = useState('Created')
	const [activeBtn, setActiveBtn] = useState('Created')
	const navigate = useNavigate()
	const { userId } = useParams()

	useEffect(() => {
		const query = userQuery(userId)

		client.fetch(query)
			.then((data) => setUser(data[0]))
			.catch((error) => console.log('error: ', error))
	}, [userId])

	useEffect(() => {
		if (text === 'created') {
			const createdPinsQuery = userCreatedPinsQuery(userId)

			client.fetch(createdPinsQuery)
				.then((data) => setPins(data))
		} else {
			const savedPinsQuery = userSavedPinsQuery(userId)

			client.fetch(savedPinsQuery)
				.then((data) => setPins(data))
		}
	}, [text, userId])

	if (!user) {
		return <Spinner message="Loading profile..." />
	}

	const logOut = () => {
		localStorage.clear()

		navigate('/login')
	}

	return (
		<div className='relative pb-2 h-full justify-center items-center'>
			<div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
						<img 
							src={randomImage} 
							alt="banner-pic" 
							className='w-full h-370 2xl:h-510 object-cover shadow-lg'
						/>
						<img 
							src={user?.image} 
							alt="user-img" 
							className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
						/>
						<h1 className="font-bold text-3xl text-center mt-3">
							{user.userName}
						</h1>
						<div className="absolute top-0 z-1 right-0 p-2">
							{userId === user?._id && (
								<button
									type='button'
									onClick={logOut}
									className='flex items-center px-2 py-3 bg-white rounded-xl  hover:shadow-md transition-all ease-in-out'
								>
									<FcGoogle className='block mr-1' /> LogOut
								</button>
							)}
						</div>
					</div>
					<div className="text-center mb-7">
						<button
							type='button'
							onClick={(e) => {
								setText(e.target.textContent)
								setActiveBtn('created')
							}}
							className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
						>
							Created
						</button>
						<button
							type='button'
							onClick={(e) => {
								setText(e.target.textContent)
								setActiveBtn('saved')
							}}
							className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
						>
							Saved
						</button>
					</div>
					{pins?.length ? (
						<div className="px-2">
							<MasonryLayout pins={pins} />
						</div>
					): (
						<div className="flex items-center justify-center font-bold text-2xl mt-2 w-full">
							Pins not found!
						</div>
					)}
					
				</div>
			</div>
		</div>
	)
}

export default UserProfile

