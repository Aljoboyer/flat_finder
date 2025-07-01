import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Buttons } from '@/components/common/Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import FFbadge from '@/components/common/FFbadge';
import CommentIcon from '@mui/icons-material/Comment';

export default function CommentBox() {
  const [comments, setComments] = useState([
    { id: 1, name: 'Noah Pierre', text: 'I’m a bit unclear about how condensation forms...', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Mollie Hall', text: 'Really enjoyed today’s lesson on the water cycle!', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Lyle Kauffman', text: 'How do we measure water vapor in the air?', avatar: 'https://i.pravatar.cc/150?img=3' },
  ]);
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      setComments(prev => [
        ...prev,
        {
          id: Date.now(),
          name: 'New User',
          text: commentText,
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
      ]);
      setCommentText('');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto h-[550px] rounded-xl border border-gray-200 shadow-sm bg-white flex flex-col overflow-hidden">
      
      {/* Sticky Input */}
      <div className="sticky top-0 z-10 bg-white border-b p-4">
        <textarea
          className="w-full resize-none border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-basecolor bg-[#f2f2f2]"
          rows={3}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="space-x-2  flex flex-row items-center">
                <p className='text-p font-bold text-blackshade'>Comments</p>
                <FFbadge icon={<CommentIcon sx={{color: COLORS.baseColor}}/>} count={10} />
          </div>

          <Buttons
            onClickHandler={handleSubmit}
            title='Submit'
            bgColor={COLORS.baseColor}
            textColor={COLORS.side_yellow}
            other_style={{width: '20%'}}
          />
        </div>
      </div>

      {/* Scrollable Comments */}
      <div className="overflow-y-auto flex-1 p-4 space-y-4 custom-scroll">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 bg-gray-50 p-3 rounded-md shadow-sm">
              <Avatar src={comment.avatar} alt={comment.name} sx={{ width: 36, height: 36 }} />
              <div>
                <p className="font-medium text-sm text-gray-800">{comment.name}</p>
                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
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
