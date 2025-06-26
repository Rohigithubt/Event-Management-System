import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IndexUserNotification,
  DeleteUserNotification,
  clearMessages
} from '../../redux/slice/usernotificationSlice';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import * as timeago from 'timeago.js';
import Swal from 'sweetalert2';

const UserNotification = () => {
  const dispatch = useDispatch();
  const { usernotification = [], loading, error, success } = useSelector(
    (state) => state.usernotification
  );

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

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this notification!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      dispatch(DeleteUserNotification(_id)).then(() => {
        dispatch(IndexUserNotification());
      });
    }
  };

  return (
    <div className='p-4 sm:p-6 !space-y-5 ml-5 mt-4 max-w-screen-2xl'>
      <div className='text-2xl font-bold mb-6'>Notifications</div>

      {loading ? (
        <div className="text-center py-4">Loading notifications...</div>
      ) : usernotification?.length === 0 ? (
        <div className="text-center py-4">No notifications found</div>
      ) : (
        <div className='flex flex-row'>
        <div className="space-y-4 w-280">
          {usernotification?.map((notification) => (
            <div
              key={notification._id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-semibold">A new webinar has been added. Visit the webinar page and join</p>
                <p className="text-xs text-gray-500 mt-2">
                  {timeago.format(notification.created_at)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(notification._id)}
                className="border border-none"
                >
                <FaTrash />
              </button>
            </div>
          ))}
                </div>
        </div>
      )}
    </div>
  );
};

export default UserNotification;
