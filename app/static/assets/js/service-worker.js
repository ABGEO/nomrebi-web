/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/static/assets/css/argon-design-system.css","d4bc878afed1306616cedd6b1167db96"],["/static/assets/css/argon-design-system.css.map","3f6e1d2bbd84ce505d1275adbde60bc8"],["/static/assets/css/argon-design-system.min.css","01ba4f09e01936a6e4fb02aa31e35b0a"],["/static/assets/css/font-awesome.css","c43dd00844c8eb85d82692d73483a258"],["/static/assets/css/nucleo-icons.css","82b2a768a478315a65cb7d27a9c29e11"],["/static/assets/css/nucleo-svg.css","99515a64208b82a5ed93779b5abd5b1c"],["/static/assets/css/toastr.min.css","bc96861d9899e4e68fb2e59c363d8c60"],["/static/assets/fonts/FontAwesome.otf","0d2717cd5d853e5c765ca032dfd41a4d"],["/static/assets/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/assets/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/static/assets/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/assets/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/static/assets/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/assets/fonts/nucleo-icons.eot","c1733565b32b585676302d4233c39da8"],["/static/assets/fonts/nucleo-icons.svg","0b8a30b10cbe7708d5f3a4b007c1d665"],["/static/assets/fonts/nucleo-icons.ttf","f82ec6ba2dc4181db2af35c499462840"],["/static/assets/fonts/nucleo-icons.woff","2569aaea6eaaf8cd210db7f2fa016743"],["/static/assets/fonts/nucleo-icons.woff2","426439788ec5ba772cdf94057f6f4659"],["/static/assets/img/apple-icon.png","655ad9485fe287f68d1afbac36e01137"],["/static/assets/img/avatar.jpg","d8a851d076dd2b17d3205b86c61019f9"],["/static/assets/img/favicon.png","e6f5d07cf347c8f7f6697c53519c5690"],["/static/assets/img/logo.png","3e8eb5759b871abb992c256e59c6ceab"],["/static/assets/img/pwa-icon.png","dab3f2832327c779a0f9f4055b3aa693"],["/static/assets/img/social_image.png","68aaa637592fc0e9fe5c98a39720857e"],["/static/assets/js/app.js","48c856e62a707f306db4a1a5d14f73bd"],["/static/assets/js/argon-design-system.js","4a4112cb3c465a5d970e3cb615827f48"],["/static/assets/js/argon-design-system.js.map","0a64d21f5199e13263ca13c9d8f197d3"],["/static/assets/js/argon-design-system.min.js","071856dad30cbcac7c97d158ec32a23b"],["/static/assets/js/auth.js","0c8789aee6430361fd601c47f8529b30"],["/static/assets/js/core/bootstrap.min.js","00e8259f4fb0664ae55be9b184020d27"],["/static/assets/js/core/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["/static/assets/js/core/popper.min.js","3621381129597bf34d48a9e2623e05c9"],["/static/assets/js/plugins/bootstrap-datepicker.min.js","241a419bd65535b6569f46797779c43e"],["/static/assets/js/plugins/bootstrap-switch.js","9db60de69bbedc53a36187e02038386c"],["/static/assets/js/plugins/chartjs.min.js","22e340e498652dcc2b2926ba77ffb552"],["/static/assets/js/plugins/datetimepicker.js","71f1ae0c39a3debdc462c7a258fc6845"],["/static/assets/js/plugins/html2canvas.min.js","1c0a0d33851d2573b9a4e430091ba334"],["/static/assets/js/plugins/jquery.sharrre.min.js","febec31d52faf9c6d1af2c8955a46644"],["/static/assets/js/plugins/moment.min.js","19436ad9831513f90ffd2421b3d97903"],["/static/assets/js/plugins/nouislider.min.js","bcf5776a6663786178d8940c6d23f897"],["/static/assets/js/plugins/perfect-scrollbar.jquery.min.js","04ed9673cfe318346efe72b5f8dcc5a8"],["/static/assets/js/plugins/toastr.min.js","b36f28de584845317de40a7219c82b1c"],["/static/assets/js/search.js","b0df22f1ebd08829cd3e1043b794be7f"],["/static/assets/js/service-worker.js","9bbcf539b4f0fa043d4be7dfbcff0d34"],["/static/assets/js/toastr-settings.js","e054902d8559803a380d64c5067ec2a3"],["/static/assets/scss/argon-design-system.scss","bcd6acd0fe432650461f52a4fdb568e1"],["/static/assets/scss/argon-design-system/accordion.scss","d41d8cd98f00b204e9800998ecf8427e"],["/static/assets/scss/argon-design-system/alert.scss","523c906620428fbc9138b413eaddab61"],["/static/assets/scss/argon-design-system/avatar.scss","8746a722880e49b12efb0d354a430fff"],["/static/assets/scss/argon-design-system/badge.scss","277c538b6452d1ffeaee04c1d9fef0c7"],["/static/assets/scss/argon-design-system/buttons.scss","da77e38893f76ea7e698b6788c9c55bf"],["/static/assets/scss/argon-design-system/card.scss","ce2aafdfd7760f66ba2bd6c4d7ed999b"],["/static/assets/scss/argon-design-system/carousel.scss","815bb672cef4aeb3a6fcf57e3b654f97"],["/static/assets/scss/argon-design-system/close.scss","9b66baa869d12d54b8fdce01b947c6d1"],["/static/assets/scss/argon-design-system/content.scss","d41d8cd98f00b204e9800998ecf8427e"],["/static/assets/scss/argon-design-system/custom-forms.scss","139ec7e78415b3749e3073c1dab0547d"],["/static/assets/scss/argon-design-system/docs.scss","e727bd2d49f6e5d6ab8c2e006bc508ae"],["/static/assets/scss/argon-design-system/docs/clipboard-js.scss","4e8eb161d8acf079ffec08fde25eba8c"],["/static/assets/scss/argon-design-system/docs/component-examples.scss","72af40c885e7e91d25004e7696fb2887"],["/static/assets/scss/argon-design-system/docs/content.scss","8f7bc637a64adbda7cdc3f1a5c9a70f8"],["/static/assets/scss/argon-design-system/docs/footer.scss","5413cf361306c2fa5a04e89a70dee389"],["/static/assets/scss/argon-design-system/docs/nav.scss","e5ccd61d1355e05f45050728d096a3a0"],["/static/assets/scss/argon-design-system/docs/prism.scss","034a6cb542e41d9ea83a3c9e2a408667"],["/static/assets/scss/argon-design-system/docs/sidebar.scss","81c0e1240ee388b4a6a8e9b3a8a4b64b"],["/static/assets/scss/argon-design-system/docs/variables.scss","8a0c06304a87e4636eba92e878191a5c"],["/static/assets/scss/argon-design-system/dropdown.scss","536f2ae37fab45b7544b2b87fc73f0a6"],["/static/assets/scss/argon-design-system/footer.scss","6711efd0c2a02453da1d7bb0ac255b5b"],["/static/assets/scss/argon-design-system/forms.scss","be03a647669c7739f51187346f5399fa"],["/static/assets/scss/argon-design-system/functions.scss","5eddfc6c79579a88423c5c26ba03b0b2"],["/static/assets/scss/argon-design-system/global.scss","00a1141302f7064c33c78f7d6ab27dbd"],["/static/assets/scss/argon-design-system/grid.scss","25f80a1f0363be7153bee4704463219e"],["/static/assets/scss/argon-design-system/icons.scss","811e1d649087a163fbc247e6a7477667"],["/static/assets/scss/argon-design-system/input-group.scss","25f0161899da150c1fd378b28d8ba022"],["/static/assets/scss/argon-design-system/kit-free.scss","ac92d1dff2b37cc98d421b53987e839e"],["/static/assets/scss/argon-design-system/list-group.scss","7186961d3ec498703e1428d485834ea8"],["/static/assets/scss/argon-design-system/mixins.scss","ad81bf2e6c482f8223c0d66428651401"],["/static/assets/scss/argon-design-system/mixins/alert.scss","4cbc2b63f555b25717a8c46854fb702a"],["/static/assets/scss/argon-design-system/mixins/background-variant.scss","9e221f19e29731a896210de6d2dc5179"],["/static/assets/scss/argon-design-system/mixins/badge.scss","00ac453c1abbfa262619922a9d20cc74"],["/static/assets/scss/argon-design-system/mixins/buttons.scss","e5a0c9073d83416739cab1387990d38b"],["/static/assets/scss/argon-design-system/mixins/forms.scss","3f837e85e31a7d3063a38de420595ad0"],["/static/assets/scss/argon-design-system/mixins/icon.scss","d1f57940556baab0e2363f5e6c7b3833"],["/static/assets/scss/argon-design-system/mixins/modals.scss","75a1e997040a753428e6efe42c0f5c77"],["/static/assets/scss/argon-design-system/mixins/popover.scss","3b83c4bc56101981b659f85cf9a3a46a"],["/static/assets/scss/argon-design-system/modal.scss","6e33979b1bf68502518f2ab4e47e1313"],["/static/assets/scss/argon-design-system/nav.scss","b6611929311747978487b5b806f69ed4"],["/static/assets/scss/argon-design-system/navbar.scss","3fb0d98ce53ed3e366c687f7efbda2aa"],["/static/assets/scss/argon-design-system/pagination.scss","f44a7d48cf79fba551f623268d462785"],["/static/assets/scss/argon-design-system/popover.scss","ca78ebcfd08b23d01d64ab6da1ab7c78"],["/static/assets/scss/argon-design-system/progress.scss","0a01a662273bf2e78cb4b2aaadaee3a0"],["/static/assets/scss/argon-design-system/reboot.scss","3226d6926e7b11148255e9bc863573d2"],["/static/assets/scss/argon-design-system/section.scss","575bf5b92ead0edbfb39787d74210b5c"],["/static/assets/scss/argon-design-system/separator.scss","dd5358cafc0b656ff0da33cb4613d364"],["/static/assets/scss/argon-design-system/theme.scss","e5ad7015ca0aa0687bab2826289135b6"],["/static/assets/scss/argon-design-system/type.scss","74f4e288552d55a5777abeb2dc56c9f4"],["/static/assets/scss/argon-design-system/utilities.scss","7382b4c709c3dc8ebd8bb2b418bd7000"],["/static/assets/scss/argon-design-system/utilities/backgrounds.scss","0b9fa544e2d46a084db59da46a7e02c8"],["/static/assets/scss/argon-design-system/utilities/floating.scss","6f17c5a0338bb06799252db9ffa70897"],["/static/assets/scss/argon-design-system/utilities/helper.scss","0fbf64c0bf68b6d2ba00a5a8e247aa98"],["/static/assets/scss/argon-design-system/utilities/position.scss","5910a30a2eb9c8abdf3d66221a3a1c81"],["/static/assets/scss/argon-design-system/utilities/shadows.scss","af8e293e1d13fb678792e72acc4a626f"],["/static/assets/scss/argon-design-system/utilities/sizing.scss","5562d8c9a8204804ebf4c6b295bb6526"],["/static/assets/scss/argon-design-system/utilities/spacing.scss","fad86c4fcdaa84e2994fe9a5d7c7ab03"],["/static/assets/scss/argon-design-system/utilities/text.scss","916a250848a2b150f725f30e8f75225b"],["/static/assets/scss/argon-design-system/utilities/transform.scss","c134361279f6d3671b1bb81b1f69354c"],["/static/assets/scss/argon-design-system/variables.scss","266e5401f341a39c09407160e026217b"],["/static/assets/scss/argon-design-system/vendor/_bootstrap-datepicker.scss","c52b4448c248da9058b790e2d061834a"],["/static/assets/scss/argon-design-system/vendor/datetimepicker.scss","89e945b150ee7aefc1bc3ba69f773967"],["/static/assets/scss/argon-design-system/vendor/headroom.scss","55911155f62ce4914fd60ffbb6d1b537"],["/static/assets/scss/argon-design-system/vendor/nouislider.scss","b9472518cc449c6ed718db184d542eb2"],["/static/assets/scss/argon-design-system/vendor/scrollbar.scss","18c5ef9dd1594b9a3e73fb89ab71809d"],["/static/assets/scss/argon-design-system/vendors.scss","fcddbde2f47ef9355b921a649eb6810e"],["/static/assets/scss/bootstrap/_alert.scss","18f72f816db1fd418350d0115f2b2c84"],["/static/assets/scss/bootstrap/_badge.scss","083de91d3fa8c4e8de977b3eaee105f3"],["/static/assets/scss/bootstrap/_breadcrumb.scss","ae5511f8896f42fb8b7f95fc8123f9d4"],["/static/assets/scss/bootstrap/_button-group.scss","8ffa4f97c7663ec5c43e1c9e42f7ff65"],["/static/assets/scss/bootstrap/_buttons.scss","1bbda96c3e76e5fd5ac4062aa6d5fc32"],["/static/assets/scss/bootstrap/_card.scss","4e425bce6b078ea8322b2ff65a7e7855"],["/static/assets/scss/bootstrap/_carousel.scss","728734a56cd07945773477d946350467"],["/static/assets/scss/bootstrap/_close.scss","59bd097f3a59e0fc42986b6820a8a070"],["/static/assets/scss/bootstrap/_code.scss","6866d2915e0b9ed92025a28b4fae93a2"],["/static/assets/scss/bootstrap/_custom-forms.scss","582567b803f69253689c841d8fc10b9a"],["/static/assets/scss/bootstrap/_dropdown.scss","97b4c243e1dc3c7c548fbb0f542de786"],["/static/assets/scss/bootstrap/_forms.scss","4cf5e3e11e2dc008c1de8232a00770c1"],["/static/assets/scss/bootstrap/_functions.scss","1fe45e6a3a4636d5df5be9f863a9d5dd"],["/static/assets/scss/bootstrap/_grid.scss","7a62e00e17b11915d573f2c361c3019f"],["/static/assets/scss/bootstrap/_images.scss","31155c1be5db7867747f81f47ad747d4"],["/static/assets/scss/bootstrap/_input-group.scss","db2d2e05928d1f3fa37f524d4b83ae74"],["/static/assets/scss/bootstrap/_jumbotron.scss","d969f3ff6b93ef5d1b8a2d30149e336b"],["/static/assets/scss/bootstrap/_list-group.scss","942bff9b79090bcd05e7c682f5162ec0"],["/static/assets/scss/bootstrap/_media.scss","d2ea169e5ccb567ff12e945885a90fa6"],["/static/assets/scss/bootstrap/_mixins.scss","dd9eadf9f016bf74447de7abb3c9f84a"],["/static/assets/scss/bootstrap/_modal.scss","8e1251712da14b8f0356541b3e7e1022"],["/static/assets/scss/bootstrap/_nav.scss","41491280b44c7e859cedaca9d98498fb"],["/static/assets/scss/bootstrap/_navbar.scss","84528287a3664d9aa59c81cf9f9e14fd"],["/static/assets/scss/bootstrap/_pagination.scss","61e96a773f34ea0f0ae631433a712b5a"],["/static/assets/scss/bootstrap/_popover.scss","304e4cadfe933d4f25170a5e42c20446"],["/static/assets/scss/bootstrap/_print.scss","6d202296a3203fab6d05e11001f3081a"],["/static/assets/scss/bootstrap/_progress.scss","ad2c061c92c7f62faf3dcf88ef2025fb"],["/static/assets/scss/bootstrap/_reboot.scss","028a98319a69531b58046180e83516a1"],["/static/assets/scss/bootstrap/_root.scss","111c0270ee49008df62a2e9ba0078f01"],["/static/assets/scss/bootstrap/_spinners.scss","82e71fea62a61193ceba682115a96fd8"],["/static/assets/scss/bootstrap/_tables.scss","8cebceda47d2a76cdac80687737ab441"],["/static/assets/scss/bootstrap/_toasts.scss","0cce5ec73009c0f087fe07c485336af6"],["/static/assets/scss/bootstrap/_tooltip.scss","61cfa44c3bbc57aca5079673875abb8d"],["/static/assets/scss/bootstrap/_transitions.scss","3718dbf96921102bc26ac3224f2de72a"],["/static/assets/scss/bootstrap/_type.scss","f39052236f5254ccd93d61404887b267"],["/static/assets/scss/bootstrap/_utilities.scss","7ad37cfec1056da9fb94304769ef02aa"],["/static/assets/scss/bootstrap/_variables.scss","d1c264fc584d2d5e955528df108947b7"],["/static/assets/scss/bootstrap/bootstrap-grid.scss","7be0158d2ec3afa6879a376ed4c803eb"],["/static/assets/scss/bootstrap/bootstrap-reboot.scss","698fdee486e22f4829fe052aa9ba5be5"],["/static/assets/scss/bootstrap/bootstrap.scss","d5a06fca3026946692cfda36e5ffac19"],["/static/assets/scss/bootstrap/mixins/_alert.scss","2bed73c51e646a7d2e30f05d02864101"],["/static/assets/scss/bootstrap/mixins/_background-variant.scss","a8951be7f19a8c0ac9d21b2d1a5831f4"],["/static/assets/scss/bootstrap/mixins/_badge.scss","e9f369ed8d11bbe64a1063c2ae60f4f2"],["/static/assets/scss/bootstrap/mixins/_border-radius.scss","9ffa6232218cd95aa16086fd00f8ccfa"],["/static/assets/scss/bootstrap/mixins/_box-shadow.scss","e50901e86d7f225f22a5f088e8726276"],["/static/assets/scss/bootstrap/mixins/_breakpoints.scss","9a14819fe9ca5e92c4b264126c626947"],["/static/assets/scss/bootstrap/mixins/_buttons.scss","8af278e8a7865684acfa3304ad707eed"],["/static/assets/scss/bootstrap/mixins/_caret.scss","c33dba7ed0786b7c92be8e7f9d7f8cb1"],["/static/assets/scss/bootstrap/mixins/_clearfix.scss","f8d39651a1054cf73e1d56ad398c0af0"],["/static/assets/scss/bootstrap/mixins/_deprecate.scss","19856441739526899f902c884f3d2b58"],["/static/assets/scss/bootstrap/mixins/_float.scss","7dbe0cf87bc253ced4ef63a328d46913"],["/static/assets/scss/bootstrap/mixins/_forms.scss","d6c2e0a2801a7353f33063782a335a4f"],["/static/assets/scss/bootstrap/mixins/_gradients.scss","0f44c939a3f29492ccc0cbd62499f940"],["/static/assets/scss/bootstrap/mixins/_grid-framework.scss","2d7a41e264ef2debd6c2b8ef0d4ab844"],["/static/assets/scss/bootstrap/mixins/_grid.scss","47e319a8911bea7a9ac04b25fcfd4278"],["/static/assets/scss/bootstrap/mixins/_hover.scss","f884a03407e4592c1fb0bb9e6b8b5282"],["/static/assets/scss/bootstrap/mixins/_image.scss","0819d3c71fc9babbb6f4ad669b0dd707"],["/static/assets/scss/bootstrap/mixins/_list-group.scss","d0bd528640e0a1b7858f2a8d8a3f98f0"],["/static/assets/scss/bootstrap/mixins/_lists.scss","c7e34a356a8616f3ad20b7bf88c93854"],["/static/assets/scss/bootstrap/mixins/_nav-divider.scss","07d70d24944b9ca2cfff3ca5d8d4eb53"],["/static/assets/scss/bootstrap/mixins/_pagination.scss","89f0d99dff6d6c54feab5056360f4186"],["/static/assets/scss/bootstrap/mixins/_reset-text.scss","d098796b407628c791dc2028581293b6"],["/static/assets/scss/bootstrap/mixins/_resize.scss","af032cea5fd5e37d9a5a8b971e290ff4"],["/static/assets/scss/bootstrap/mixins/_screen-reader.scss","e37dc4419b741957d814ca73b7ba3da3"],["/static/assets/scss/bootstrap/mixins/_size.scss","07e14cdbaee0d59ce17c0b0b35542db3"],["/static/assets/scss/bootstrap/mixins/_table-row.scss","fb7ac200c753b8fd65a594bb32aa5903"],["/static/assets/scss/bootstrap/mixins/_text-emphasis.scss","93e8ae8484e453d2a2e62fa130af300f"],["/static/assets/scss/bootstrap/mixins/_text-hide.scss","31dc39c6f1caeeb8a58a2b61f0b85ef2"],["/static/assets/scss/bootstrap/mixins/_text-truncate.scss","c51a1018bf42368c45eb12d6ac16f938"],["/static/assets/scss/bootstrap/mixins/_transition.scss","4f9766c6933508019a1157be5f6ab14c"],["/static/assets/scss/bootstrap/mixins/_visibility.scss","3d3bc176127e434b66ffc633db0a4cb9"],["/static/assets/scss/bootstrap/utilities/_align.scss","2d85a42f5904cead7a9371485c63dce5"],["/static/assets/scss/bootstrap/utilities/_background.scss","e733cf333823bd71687f542c67e18d4d"],["/static/assets/scss/bootstrap/utilities/_borders.scss","89e155df0b515db48d06c70e86bd2766"],["/static/assets/scss/bootstrap/utilities/_clearfix.scss","01ed6cc705196c6f0fe33300de134ee7"],["/static/assets/scss/bootstrap/utilities/_display.scss","8af96c91de4e92e373a40d5f9b87cd91"],["/static/assets/scss/bootstrap/utilities/_embed.scss","d3f25ca3432be66d146f108e4b855595"],["/static/assets/scss/bootstrap/utilities/_flex.scss","6a75ca706305a0a90e6c2d8d9f0ea162"],["/static/assets/scss/bootstrap/utilities/_float.scss","caa8e0a1ce2bab5af0c96dfbefe3dd9b"],["/static/assets/scss/bootstrap/utilities/_overflow.scss","db617c241dbced8683a23c0428717633"],["/static/assets/scss/bootstrap/utilities/_position.scss","0ca5a3796af56ce5a9eb8997463e41a9"],["/static/assets/scss/bootstrap/utilities/_screenreaders.scss","84c388e27d908d2489d1724f464cdc71"],["/static/assets/scss/bootstrap/utilities/_shadows.scss","8d38293481d07336b8811782205e50c8"],["/static/assets/scss/bootstrap/utilities/_sizing.scss","3e7cdb7eadea66c9cd46d6b268da6576"],["/static/assets/scss/bootstrap/utilities/_spacing.scss","c401a7ad414bf95c2e45f51176383072"],["/static/assets/scss/bootstrap/utilities/_stretched-link.scss","26d1a1fb32d45482e8703e17dce77065"],["/static/assets/scss/bootstrap/utilities/_text.scss","e538f2cf92b9646e6d61f8871083bddd"],["/static/assets/scss/bootstrap/utilities/_visibility.scss","545510f15dee6de8164d514fcfe1ab52"],["/static/assets/scss/bootstrap/vendor/_rfs.scss","23ec02c88f8d4d1a8958ea9a456193b9"],["/static/gulpfile.js","4d63a45b05a105494171b70b59edc836"],["/static/manifest.json","4f8b1db7554feacd8123fea2ffa07fad"],["/static/package.json","a57cd60e6319c14e4a9ff40c95409b6d"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {

      // Force the SW to transition from installing -> active state
      return self.skipWaiting();

    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {

      return self.clients.claim();

    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});
