import {FastifyReply,FastifyRequest} from "fastify";
import { createChannelRepository } from "../modules/channel/channel.repository.js";
export const channelOwnerMiddleware = async (request:FastifyRequest,reply:FastifyReply)=>{
    const {channelId} = request.params as {channelId:string};
    if (!channelId) {
        return;
    }
    const channelExist = await createChannelRepository(request.server.prisma).findById(channelId);
    if(!channelExist){
        throw new Error(`Channel does not exist with id ${channelId}`);
    }
    if(channelExist.ownerId !== request.user.userId){
        throw new Error(`You are not authorized to perform this action`,{cause:403});
    }
}