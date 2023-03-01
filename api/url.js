import requestYT from './requestYT';

export const getSalaryCode = async (tel) => {
  const options = {
    url: 'salary/getSalaryCode.do',
    data: JSON.stringify({
      tel,
    }),
  };

  const res = await requestYT(options);
  return res
};

// 精彩瞬间查询
export const queryWonderfulMoments = async (data) => {
  const options = {
    url: 'wonderfulMoments/queryWonderfulMoments.do',
    data:JSON.stringify({
      BT_SORT: "1",
      PAGE_SIZE: "10",
      NEXT_KEY: "1"
    }),
  };

  const res = await requestYT(options);
  return res
};
// 机构查询
export const queryOrganizationalCategory = async (data) => {
  const options = {
    url: 'organizationalStyle/queryOrganizationalCategory.do'
  };

  const res = await requestYT(options);
  return res
};
export const queryWonderfuldetail = async (data) => {
  console.log(data);
  const options = {
    url: 'wonderfulMoments/queryWonderfulMomentsInfo.do',
    data:JSON.stringify({
      WM_ID: data.WM_ID
    }),
  };

  const res = await requestYT(options);
  return res
};

// 票据业务新增或修改
export const addOrUpdateBillBusiness = async (data) => {
  const options = {
    url: 'billBusiness/addOrUpdateBillBusiness.do',
    data:JSON.stringify(data),
  };

  const res = await requestYT(options);
  return res
};

//票据业务详情或查询
export const queryBillBusiness = async (data) => {
  const options = {
    url: 'billBusiness/queryBillBusiness.do',
    data:JSON.stringify(
      data
    ),
  };

  const res = await requestYT(options);
  return res
};

//头条资讯查询
export const queryHeadlineNewsList = async (data) => {
  const options = {
    url: 'headlineNews/queryHeadlineNewsList.do',
    data:JSON.stringify(data),
  };

  const res = await requestYT(options);
  return res
};

//头条资讯详情
export const queryHeadlineNewsInfo = async (data) => {
  const options = {
    url: 'headlineNews/queryHeadlineNewsInfo.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//票据删除
export const delBillBusiness = async (data) => {
  const options = {
    url: 'billBusiness/delBillBusiness.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//用户信息
export const queryRegisterInfo = async (data) => {
  const options = {
    url: 'rlcUserInfo/queryRegisterInfo.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//信用债信息新增或修改
export const addOrUpdateCreditBond = async (data) => {
  const options = {
    url: 'creditBond/addOrUpdateCreditBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//利率债信息新增或修改
export const addOrUpdateRateBond = async (data) => {
  const options = {
    url: 'rateBond/addOrUpdateRateBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//金融债信息新增或修改
export const addOrUpdateFinanceBond = async (data) => {
  const options = {
    url: 'financeBond/addOrUpdateFinanceBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//搜索
export const comprehensivesearch = async (data) => {
  const options = {
    url: 'comprehensive/search.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//最新报价
export const lastestquotation = async (data) => {
  const options = {
    url: 'lastest/quotation.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//热搜接口
export const hotSearch = async (data) => {
  const options = {
    url: 'comprehensive/hotSearch.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//研究专栏类型查询
export const queryResearchCategoryList = async (data) => {
  const options = {
    url: 'researchSpecialColumn/queryResearchCategoryList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//研究专栏信息列表查询 
export const queryResearchSpecialColumnList = async (data) => {
  const options = {
    url: 'researchSpecialColumn/queryResearchSpecialColumnList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//研究专栏信息详情查询 
export const queryResearchSpecialColumnInfo = async (data) => {
  const options = {
    url: 'researchSpecialColumn/queryResearchSpecialColumnInfo.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//信用债信息查询
export const selectCreditBond = async (data) => {
  const options = {
    url: 'creditBond/selectCreditBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//金融债信息查询
export const queryFinanceBond = async (data) => {
  const options = {
    url: 'financeBond/queryFinanceBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//利率债信息查询
export const selectRateBond = async (data) => {
  const options = {
    url: 'rateBond/selectRateBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//微信登录
export const weChatLogin = async (data) => {
  const options = {
    url: 'weChatLogin/getWeChatOpenId.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//我的发布
export const myPostscreen = async (data) => {
  const options = {
    url: 'myPost/screen.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//信用债信息删除
export const deleteCreditBond = async (data) => {
  const options = {
    url: 'creditBond/deleteCreditBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//利率债信息删除
export const deleteRateBond = async (data) => {
  const options = {
    url: 'rateBond/deleteRateBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};



//金融债-删除
export const delFinanceBond = async (data) => {
  const options = {
    url: 'finance/delFinanceBond.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//上传附件
// export const rlcuploadFile = 'https://wxapptest.jsbchina.cn:9629/wxgatewaysit/rlc/uploadFile';

// export const rlcuploadFile = 'https://wxapptest.jsbchina.cn:9629/wxgatewaysit/upLoad/upLoadFile.do';

export const rlcuploadFile = async (data) => {
  const options = {
    url: 'upLoad/upLoadFile.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};
//敏感词校验
export const sensitiveWord = async (data) => {
  const options = {
    url: 'check/sensitiveWord.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//发送验证码
export const sendMsg = async (data) => {
  const options = {
    url: 'rlcUserInfo/sendMsg.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//验证验证码
export const checkMsg = async (data) => {
  const options = {
    url: 'rlcUserInfo/checkMsg.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//查询用户信息
export const queryRegisterInfoById = async (data) => {
  const options = {
    url: 'rlcUserInfo/queryRegisterInfoById.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//用户信息审核状态查询
export const queryAuditFlag = async (data) => {
  const options = {
    url: 'rlcUserInfo/queryAuditFlag.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//资产证券化业务新增或修改
export const addOrUpdateAbs = async (data) => {
  const options = {
    url: 'abs/addOrUpdateAbs.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//资产证券化业务查询或详情
export const abSqueryAbs = async (data) => {
  const options = {
    url: 'abs/queryAbs.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//资产证券化删除
export const delAbs = async (data) => {
  const options = {
    url: 'abs/delAbs.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业理财新增或修改
export const addOrUpdateTradeFinance = async (data) => {
  const options = {
    url: 'tradeFinance/addOrUpdateTradeFinance.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业理财查询
export const selectTradeFinanceList = async (data) => {
  const options = {
    url: 'tradeFinance/selectTradeFinanceList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业理财删除
export const deleteTradeFinance = async (data) => {
  const options = {
    url: 'tradeFinance/deleteTradeFinance.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};


//公募基金新增或修改
export const addOrUpdatePublicFund = async (data) => {
  const options = {
    url: 'publicFund/addOrUpdatePublicFund.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//公募基金查询
export const selectPublicFundList = async (data) => {
  const options = {
    url: 'publicFund/selectPublicFundList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//公募基金删除
export const deletePublicFund = async (data) => {
  const options = {
    url: 'publicFund/deletePublicFund.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//名片识别
export const rlcUserInfoimage = async (data) => {
  const options = {
    url: 'rlcUserInfo/image.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//银团贷款查询或详情
export const querySyndicatedLoan = async (data) => {
  const options = {
    url: 'syndicatedLoan/querySyndicatedLoan.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//银团贷款删除
export const delSyndicatedLoan = async (data) => {
  const options = {
    url: 'syndicatedLoan/delSyndicatedLoan.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//银团贷款新增或编辑
export const addOrUpdateSyndicatedLoan = async (data) => {
  const options = {
    url: 'syndicatedLoan/addOrUpdateSyndicatedLoan.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业借款业务新增或修改
export const addOrUpdateTradeBorrow = async (data) => {
  const options = {
    url: 'tradeBorrow/addOrUpdateTradeBorrow.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业借款业务查询
export const queryTradeBorrow = async (data) => {
  const options = {
    url: 'tradeBorrow/queryTradeBorrow.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业借款业务删除
export const delTradeBorrow = async (data) => {
  const options = {
    url: 'tradeBorrow/delTradeBorrow.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业存单新增或修改
export const addOrUpdateTradeReceipt = async (data) => {
  const options = {
    url: 'tradeReceipt/addOrUpdateTradeReceipt.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业存单查询
export const selectTradeReceiptList = async (data) => {
  const options = {
    url: 'tradeReceipt/selectTradeReceiptList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业存单删除
export const deleteTradeReceipt = async (data) => {
  const options = {
    url: 'tradeReceipt/deleteTradeReceipt.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业存款新增或修改
export const addOrUpdateTradeDeposit = async (data) => {
  const options = {
    url: 'tradeDeposit/addOrUpdateTradeDeposit.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业存款查询
export const selectTradeDepositList = async (data) => {
  const options = {
    url: 'tradeDeposit/selectTradeDepositList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//同业存款删除
export const deleteTradeDeposit = async (data) => {
  const options = {
    url: 'tradeDeposit/deleteTradeDeposit.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//删除文件
export const delFile = async (data) => {
  const options = {
    url: 'file/delFile.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//协议查询
export const queryAgreeMent = async (data) => {
  const options = {
    url: 'agreeMent/queryAgreeMent.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//用户信息列表查询
export const selectRlcUserInfoList = async (data) => {
  const options = {
    url: 'rlcUserInfo/selectRlcUserInfoList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//白名单列表
export const queryWhiteOrgList = async (data) => {
  const options = {
    url: 'whiteOrg/queryWhiteOrgList.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};

//资产托管查询
export const selectAssetCustodyInfo = async (data) => {
  const options = {
    url: 'assetCustody/selectAssetCustodyInfo.do',
    data:JSON.stringify(data)
  };

  const res = await requestYT(options);
  return res
};





