import { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Buttons } from '@/components/common/Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import FFbadge from '@/components/common/FFbadge';
import CommentIcon from '@mui/icons-material/Comment';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { getSocket } from '@/utils/socket/socket';

export default function CommentBox({property}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const userData = getLocalStorageData();
  const socket = getSocket();
  const commentRef = useRef(null);

  const handleSubmit = () => {
    if(userData?.role == 'buyer'){
      const commentObj = {
        profileImg: userData?.image,
        text: commentText,
        name: userData?.name,
        commenterId: userData?._id,
        fromAuthor: false
      }
      socket.emit('addComments', commentObj)
    }
    else{

    }
  };

  useEffect(() => {
    if(property?.comments > 0){
      setComments(property?.comments)
    }
  },[])

    useEffect(() => {
    const handleAddComnt = (comnt) => {

      const currentCommentData = commentRef.current
      
      setComments([...currentCommentData, comnt])
    }
    socket.on("receivedcomments", handleAddComnt)

    return () =>{
      socket.off("receivedcomments")
    }
  },[])


    useEffect(() => {
    if(comments?.length > 0){
      commentRef.current = comments
    }else {
      commentRef.current = []
    }
  },[comments])

  return (
    <div className="w-full max-w-xl mx-auto h-[550px] rounded-xl border border-gray-200 shadow-sm bg-white flex flex-col overflow-hidden">
      
      <div className="sticky top-0 z-10 bg-white border-b p-4">
        <textarea
          className="w-full resize-none border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-basecolor bg-[#f2f2f2]"
          rows={3}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={userData?.role == 'seller' || !userData?.email}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="space-x-2  flex flex-row items-center">
                <p className='text-p font-bold text-blackshade'>Comments</p>
                <FFbadge icon={<CommentIcon sx={{color: COLORS.baseColor}}/>} count={comments?.length} />
          </div>

          <Buttons
            onClickHandler={handleSubmit}
            title='Submit'
            bgColor={COLORS.baseColor}
            textColor={COLORS.side_yellow}
            other_style={{width: '20%'}}
            disabled={userData?.role == 'seller' || !userData?.email}
          />
        </div>
      </div>

      {/* Scrollable Comments */}
      <div className="overflow-y-auto flex-1 p-4 space-y-4 custom-scroll">
        {comments.length === 0 ? (
          <p className="text-xl_title text-gray-400 ">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 bg-gray-50 p-3 rounded-md shadow-sm">
              <Avatar src={comment?.profileImg} alt={comment.name} sx={{ width: 36, height: 36 }} />
              <div>
                <p className="font-medium text-sm text-gray-800">{comment?.fromAuthor ? 'Author' : comment?.name}</p>
                <p className="text-sm text-gray-700 mt-1">{comment?.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sticky Bottom "Show more" */}
      <div className="sticky bottom-0 bg-white border-t border-basecolor p-3">
        <button className="w-full text-blue-800 hover:underline text-p font-medium cursor-pointer">
          Show more
        </button>
      </div>
    </div>
  );
}
