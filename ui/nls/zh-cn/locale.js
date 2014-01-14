"use strict";
define({	   
    loading:'数据加载中 ...',
    user:{
        loginView:{
            viewTitle: '<span>欢迎</span>登录',
            email: '电子邮件',
            password: '登录密码',
            signIn: '登录',
            or: '或者',
            remember: '记住我的账户',
            forgetPassword: '忘记密码?',
            createAccount: '创建新账户',
            signing: '登录中...',
            copyright: '&copy; 2014 Openbiz LLC',
            validation:{
                incorrectPassword: "您输入的用户名或密码可能不正确"
            }
        },
        forgetPasswordView:{
            viewTitle: '<span>找回</span>密码',
            pleaseInputEmail: '请在下面的输入框内填写您的电子邮件地址，我们的系统将会自动发给你一封带有密码重置连接的电子邮件，请注意查收。',
            email: '电子邮件',
            or: '或者',
            sendRequest: '发送请求',
            copyright: '&copy; 2014 Openbiz LLC',
            goToLogin: '返回登陆页面'
        },
        registerView:{
            viewTitle: '<span>创建</span>新的账户',
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
            signing: '创建中...',
            validation:{
                needAgreement: '您需要同意本协议才可以继续',
                passwordNotMatch:'两次密码输入不一致',
                emailDuplicated: '该邮件地址已经被其他用户注册'
            }
        }
    },
    system:{
        headerView:{
            hi: '欢迎',
            help: '帮助'
        },
        navView:{
            hi: '欢迎'
        }
    },
    me:{
        setupWizardView:{

        }
    },
    breadcrumb:{
        home:'首页',
        myAccount:'我的账户',
        setupWizard: '初始化向导'
    }
});