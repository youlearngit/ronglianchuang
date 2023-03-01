import requestYT from './requestYT';

// 机构查询
export const queryOrganizationalCategory = async (data) => {
  const options = {
    url: 'organizationalStyle/queryOrganizationalCategory.do',
    data:JSON.stringify({
    }),
  };

  const res = await requestYT(options);
  return res
};

// 成员查询
export const queryOrganizationalMember = async (data) => {
  const options = {
    url: 'organizationalStyle/queryOrganizationalMember.do',
    data:JSON.stringify(data),
  };

  const res = await requestYT(options);
  return res
};

// 成员详情查询
export const queryOrganizationalMemberInfo = async (data) => {
  const options = {
    url: 'organizationalStyle/queryOrganizationalMemberInfo.do',
    data:JSON.stringify({
      OM_ID: data.OM_ID
    }),
  };

  const res = await requestYT(options);
  return res
};

// 成员详情查询
export const completeUserInfo = async (data) => {
  const options = {
    url: 'rlcUserInfo/completeUserInfo.do',
    data:JSON.stringify(data),
  };

  const res = await requestYT(options);
  return res
};completeUserInfo