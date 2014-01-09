"use strict";
define({	   
    loading:'数据加载中 ...', 
	loginView:{
    	existingUsers: '我是老用户',
    	email: '电子邮件',
    	password: '登录密码',
    	signIn: '登录',
    	forgetPassword: '忘记密码?',
    	or: '或者',
    	signInWithSocial: '使用社交网络账号登录',
    	newUsers: '我是新用户',
    	ifDontHaveAccount: "如果您还有没创建过账户，请点击下面的按钮来开始创建。",
    	createAccount: '创建新账户',
        signing: '登录中...',
        validation:{
            incorrectPassword: "您输入的用户名或密码可能不正确"
        }
    },
    resetPasswordView:{
        resetPassword: '找回密码',
        pleaseInputEmail: '请在下面的输入框内填写您的电子邮件地址，我们的系统将会自动发给你一封带有密码重置连接的电子邮件，请注意查收。',
        email: '电子邮件',
        sendRequest: '发送请求',
        goToLogin: '返回登陆页面'
    },
    registerView:{
        createAccountTitle: '创建新的账户',        
        createAccountButton: '创建账户',
        alreadyHaveAccount: '已经有账户了么? ',
        goToLogin: '返回登录',
        title: '称呼',
        titleMr:    '先生',
        titleMiss:  '小姐',
        titleMrs:   '夫人',
        titleMs:    '女士',
        name: '姓名',
        firstName : '名字',
        lastName : '姓氏',
        nameFormat: ['lastName','firstName'],
        company: '公司', 
        phone: '电话',
        mobile: '手机',
        mobileNumber: '手机号码',
        phoneDefaultCountryCode: '+86',
        phoneCountryCode: '国家编码',
        phoneAreaCode: '区号',
        phoneNumber: '电话号码',
        email: '电子邮件',
        password: '密码',
        repeatPassword: '重复密码',
        agreeWith: '我已经阅读并且认同',
        termOfUse: '使用条款',
        validation:{
            passwordNotMatch:'两次密码输入不一致',
            emailDuplicated: '该邮件地址已经被其他用户注册'
        }
    }
});