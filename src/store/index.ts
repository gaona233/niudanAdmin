/**
 * 
 * @authors 程巍巍 (chengweiwei@funstory.ai)
 * @date    2019-12-09 17:10:46
 * @version $Id$
 */

import { UserStore } from './user';

export const user = new UserStore();
// 设置 store 之前的依赖产系
user.init();