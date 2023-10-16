
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link className="w-full bg-gray-100 rounded-xl p-4" to={`/post/${$id}`}>
        <div className='w-full justify-center text-bold'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl"/>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
    </Link>
  )
}

export default PostCard