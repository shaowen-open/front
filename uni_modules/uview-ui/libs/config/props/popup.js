/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/popup.js
 */
export default {
    // popup组件
    popup: {
        show: false,
        overlay: true,
        mode: 'center',
        duration: 300,
        closeable: false,
        overlayStyle: () => {},
        closeOnClickOverlay: true,
        zIndex: 10075,
        safeAreaInsetBottom: false,
        safeAreaInsetTop: false,
        closeIconPos: 'top-right',
        round: 0,
        zoom: true,
        bgColor: '',
        overlayOpacity: 0.5
    }
}
