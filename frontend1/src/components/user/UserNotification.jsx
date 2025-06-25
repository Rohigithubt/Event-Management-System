import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IndexUserNotification, DeleteUserNotification,clearMessages } from '../../redux/slice/usernotificationSlice';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const UserNotification = () => {
  const dispatch = useDispatch();
  const { usernotification , loading, error, success } = useSelector((state) => state.usernotification);

  useEffect(() => {
    dispatch(IndexUserNotification());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
    return () => {
      dispatch(clearMessages());
    };
  }, [error, success, dispatch]);

  const handleDelete = (usernotificationId) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      dispatch(DeleteUserNotification(usernotificationId));
    }
  };

  return (
    <div className='p-4 sm:p-6 !space-y-5 ml-5 mt-4 max-w-screen-2xl border border-gray-300 rounded-2xl'>
      <div className='text-3xl font-bold mb-6'>
        Notifications
      </div>
      
      {loading ? (
        <div className="text-center py-4">Loading notifications...</div>
      ) : usernotification?.length === 0 ? (
        <div className="text-center py-4">No notifications found</div>
      ) : (
        <div className="space-y-4">
          {usernotification?.map((notification) => (
            <div 
              key={notification.usernotificationId} 
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-medium">{notification.name}</p>
                
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(notification.usernotificationId)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                aria-label="Delete notification"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNotification;