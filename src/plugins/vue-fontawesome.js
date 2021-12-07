/* ============
 * Vue Font Awesome
 * ============
 *
 * Font Awesome 5 Vue component
 *
 * https://github.com/FortAwesome/vue-fontawesome
 */

import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faYoutube,
    faTwitter,
    faLinkedinIn,
    faTelegramPlane
} from '@fortawesome/free-brands-svg-icons';

import {
    faTrashAlt,
    faChartBar,
    faCode,
    faCircle,
    faIndent,
    faOutdent,
    faAward,
    faLayerGroup,
    faChevronUp,
    faChevronDown,
    faChevronRight,
    faChevronLeft,
    faUser,
    faCog,
    faSignOutAlt,
    faBell,
    faLanguage,
    faBars,
    faExclamationTriangle,
    faPlusCircle,
    faPencilAlt,
    faTimesCircle,
    faQuestionCircle,
    faTimes,
    faCloudUploadAlt,
    faFolderOpen,
    faDatabase,
    faCopy,
    faInfoCircle,
    faEnvelope,
    faSyncAlt,
    faDownload,
    faUpload,
    faSignal,
    faArrowDown,
    faArrowUp,
    faArrowLeft,
    faStar,
    faMoneyCheck,
    faMoneyCheckAlt,
    faSearch,
    faEye,
    faPen,
    faGift,
    faHeart,
    faEllipsisH,
    faList,
    faTh
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faChartBar,
    faGift,
    faHeart,
    faTrashAlt,
    faInfoCircle,
    faCode,
    faCircle,
    faIndent,
    faOutdent,
    faAward,
    faLayerGroup,
    faChevronUp,
    faChevronDown,
    faChevronRight,
    faChevronLeft,
    faUser,
    faCog,
    faSignOutAlt,
    faBell,
    faLanguage,
    faBars,
    faExclamationTriangle,
    faPlusCircle,
    faPencilAlt,
    faTimesCircle,
    faQuestionCircle,
    faTimes,
    faCloudUploadAlt,
    faFolderOpen,
    faDatabase,
    faCopy,
    faEnvelope,
    faSyncAlt,
    faDownload,
    faUpload,
    faSignal,
    faArrowDown,
    faArrowUp,
    faArrowLeft,
    faStar,
    faMoneyCheck,
    faMoneyCheckAlt,
    faSearch,
    faChartBar,
    faEye,
    faPen,
    faStar,
    faFacebookF,
    faInstagram,
    faYoutube,
    faTwitter,
    faLinkedinIn,
    faTelegramPlane,
    faEllipsisH,
    faList,
    faTh
);

Vue.component('fa-icon', FontAwesomeIcon);
