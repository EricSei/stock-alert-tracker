export default () => {
  let services = [
    {
      key: 0,
      price: "$25.00",
      name: "dailystock",
      interval: "monthly",
      billed: "monthly",
      title: "Daily Stock Pick",
      fees: 15.0,
      description: "Daily Stocks picked by our professionals",
      priceId: `${process.env.REACT_APP_BASIC}`,
    },
    // {
    //   key: 1,
    //   price: '$120.00',
    //   name: 'dailystock',
    //   interval: 'Annualy',
    //   billed: 'Annualy',
    //   title: "Daily Stock Pick",
    //   fees: 120.00,
    //   description: "Daily Stocks picked by our professionals",
    //   priceId: `${process.env.REACT_APP_BASIC}`
    //  },
    // {
    //   key: 2,
    //   price: '$2000.00',
    //   name: 'Premium',
    //   interval: 'month',
    //   billed: 'monthly',
    //   title: "Financial Investment",
    //   fees: 2000.00,
    //   description: "Taught by our experienced professionals through Zoom Live.",
    //   priceId:`${process.env.REACT_APP_PREMIUM}`
    // }
  ];
  return services;
};
