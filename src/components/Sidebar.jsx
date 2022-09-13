import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { FcStackOfPhotos } from 'react-icons/fc'
import { HiMenu } from 'react-icons/hi'

import { categories } from '../utils/data'

const Sidebar = ({closeToggle, user}) => {
	const isActiveStyles = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
	const isNotActiveStyles = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize'
	
	const handleCloseSidebar = () => {
		if (closeToggle) closeToggle(false)
	}

	return (
		<div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
			<div className='flex flex-col'>
					<>
						<Link 
							to='/' 
							className='flex px-5 justify-between my-6 pt-1 w-190 items-center' 
							onClick={handleCloseSidebar}
						>
							<HiMenu 
								size={`40px`} 
							/>
							<FcStackOfPhotos size={`40px`} />
						</Link>
						<div className='flex flex-col gap-5'>
							<NavLink 
								to='/' 
								className={({isActive}) => (isActive ? isNotActiveStyles : isActiveStyles)} 
								onClick={handleCloseSidebar}
							>
								<RiHomeFill />
								Home
							</NavLink>
							<h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
							{categories.slice(0, categories.length - 1).map((category) => (
								<NavLink 
									to={`/category/${category.name}`} 
									className={({isActive}) => (isActive ? isNotActiveStyles : isActiveStyles)} 
									onClick={handleCloseSidebar}
									key={category.name}
								>
									<>
										<img src={category.image} alt="category-img" className='rounded-full w-10 h-10'/>
										{category.name}
									</>
								</NavLink>
							))}
						</div>
					</>
			</div>
			{user && (
				<Link
					to={`user-profile/${user._id}`}
					className='flex my-5 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg mx-3'
					onClick={handleCloseSidebar}
				>
					<img src={user.image} alt="user-img" className='w-10 h-10 rounded-full' />
					<p>{user.userName}</p>
					<IoIosArrowForward />
				</Link>
			)}
		</div>
	)
}

export default Sidebar
