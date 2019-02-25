let $USERNAME   =   $("#username");
let $PASSWORD   =   $("#password");
let $LOGINBTN      =   $("#login");
let _username   =   getUsername();
let _password   =   getPassword();
$(function () {
    // 切换
    switchRegister()
    // login
    $LOGINBTN.click(function () {
        Login({
            username: _username || 'hliu047',
            password: _password || 'Happy2019@'
        })
    })
    // register
    RegisterModule()


});
// 登录注册切换
function switchRegister(){
    let toRegister  = $('.switch-register');
    let toLogin     = $('.switch-login');
    let module_login    = $('.module_login');
    let module_register = $('.module_register');

    toRegister.click(function(){
        module_login.hide();
        module_register.show();
    });
    
    toLogin.click(function(){
        module_register.hide();
        module_login.show();
    });
}
function getUsername(){
    $USERNAME.on('change', function(){
        _username = this.value;
        console.log(this.value)
    })
}
function getPassword(){
    $PASSWORD.on('change', function(){
        _password = this.value;
        console.log(this.value)
    })
}
function Login(arg){
    
    $.ajax({
        url: '/login/login',
        type: 'POST',
        data: {
            username: arg.username,
            password: arg.password,
        },
        success: function (data, status) {
            if (status == 'success') {
                console.log(data);
                
                // let path = getQueryletiable("redirect");
                // jumpPage(path)
            }
        },  
        error: function (data, status) {
            if (status == 'error') {
            }
        }
    });
}

function RegisterModule(){
    $('#register').click(function(evt){
        let username2 = $('#username2').val();
        let password2 = $('#password2').val();
        console.log("username2: " + username2 + '\n' + "password2:" + password2);
        submitRegister({
            username: username2,
            password: password2
        })
    })
}

function submitRegister(arg){
    
    $.ajax({
        url: '/login/register',
        type: 'POST',
        data: {
            username: arg.username,
            password: arg.password,
        },
        success: function (data, status) {
            if (status == 'success') {
                console.log(data);
                console.log(data.ret_msg)
                alert(data.ret_msg)

                // jumpPage(path)
            }
        },  
        error: function (data, status) {
            if (status == 'error') {
            }
        }
    });
}


// jumpPage
function jumpPage(path){
    window.location.href = path;
}

/**
 * 获取url参数
 * @param {string} letiable 
 */
function getQueryletiable(letiable)
{
    let query = window.location.search.substring(1);
    let lets = query.split("&");
    for (let i=0;i<lets.length;i++) {
        let pair = lets[i].split("=");
        if(pair[0] == letiable){
            return unescape(pair[1]);
        }
    }
    return(false);
}