import { IUser } from "../interfaces/users";

function leaveRoom(userID: any, chatRoomUsers: IUser[]) {
  console.log('leave room', userID, chatRoomUsers)
    return chatRoomUsers.filter((user: IUser) => user.username != userID);
  }
  
  module.exports = leaveRoom;