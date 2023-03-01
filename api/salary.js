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
    // data:JSON.stringify({
    //   BT_SORT: "1",
    //   PAGE_SIZE: "20",
    //   NEXT_KEY: "1"
    // }),
    data:JSON.stringify(data)
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
