import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client.js'

import { searchQuery, feedQuery } from '../utils/data.js'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
	const [loading, setLoading] = useState(true)
	const { categoryId } = useParams()
	const [pins, setPins] = useState()

	useEffect(() => {
		setLoading(true)

		if (categoryId) {
			const query = searchQuery(categoryId)
			
			client.fetch(query)
				.then((data) => {
					setPins(data)
					setLoading(false)
				})

		} else {
			client.fetch(feedQuery)
				.then((data) => {
					setPins(data)
					setLoading(false)
				})

		}
	}, [categoryId])

	if (loading) return <Spinner message='looking for new ideas' />
	return (
		<div>
			{pins && <MasonryLayout pins={pins} />}
		</div>
	)
}

export default Feed
