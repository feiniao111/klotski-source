/**
 * demo api请求文件
 */
import OC from '../../3rdparty/js'
export default {
    /**
     * demo
     * @param callback
     * @param paras
     */
    requestUser(callback, paras){
        var url = OC.filePath('files', 'ajax', 'user.php');
        jsonRequestByPost(paras, callback, false, url);
    },
}