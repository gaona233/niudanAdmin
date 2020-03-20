
import { GamesService } from 'service/games';

class CommonStore {
    private gamesService = new GamesService();

    async getFileUrl(fileID: string) {
        try {
            const data = await this.gamesService.getFileUrl(fileID);
            return data.file_list[0].download_url
        } catch (error) {
            throw new Error('获取上传链接失败')
        }

    }


}

export const commonStore = new CommonStore()