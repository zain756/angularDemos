
app.factory('currencyApiFactory', ['$http', 'baseURL1','baseURL2', 'apikey', function($http, baseURL1, baseURL2, apikey){
	var currencyFactory = {};
	var currencyRates = {};
	var params = {
			access_key : apikey,
			format : 1
			};
	var refresh = function(){
			$http.get(baseURL1,{params: params}).then(
				function(response){
					console.log(response.data);
					currencyRates = response.data.quotes;	
			});
	};
	refresh();
	
	currencyFactory.getRate = function(input){
		console.log(currencyRates["USD" + input]);
		return currencyRates["USD" + input];
	};
	
	currencyFactory.getRates = function(input){
		//console.log(currencyRates["USD" + input]);
		return $http.get(baseURL1, {params: params});
	};
	
	return currencyFactory;
}]);

app.factory('timeConvertFactory', function(){
	
		var timeFact = {};
		timeFact.convert = function(input){
			// Create a new JavaScript Date object based on the timestamp
			// multiplied by 1000 so that the argument is in milliseconds, not seconds.
			var date = new Date(input*1000);
			// Hours part from the timestamp
			var hours = date.getHours();
			// Minutes part from the timestamp
			var minutes = "0" + date.getMinutes();
			// Seconds part from the timestamp
			var seconds = "0" + date.getSeconds();

			// Will display time in 10:30:23 format
			var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
			return formattedTime;
		
		}
		return timeFact;
});

app.factory('currencyCodesFactory', function(){
	var currencyArr = {
    "AED":"United Arab Emirates Dirham",
    "AFN":"Afghan Afghani",
    "ALL":"Albanian Lek",
    "AMD":"Armenian Dram",
    "ANG":"Netherlands Antillean Guilder",
    "AOA":"Angolan Kwanza",
    "ARS":"Argentine Peso",
    "AUD":"Australian Dollar",
    "AWG":"Aruban Florin",
    "AZN":"Azerbaijani Manat",
    "BAM":"Bosnia-Herzegovina Convertible Mark",
    "BBD":"Barbadian Dollar",
    "BDT":"Bangladeshi Taka",
    "BGN":"Bulgarian Lev",
    "BHD":"Bahraini Dinar",
    "BIF":"Burundian Franc",
    "BMD":"Bermudan Dollar",
    "BND":"Brunei Dollar",
    "BOB":"Bolivian Boliviano",
    "BRL":"Brazilian Real",
    "BSD":"Bahamian Dollar",
    "BTC":"Bitcoin",
    "BTN":"Bhutanese Ngultrum",
    "BWP":"Botswanan Pula",
    "BYR":"Belarusian Ruble",
    "BZD":"Belize Dollar",
    "CAD":"Canadian Dollar",
    "CDF":"Congolese Franc",
    "CHF":"Swiss Franc",
    "CLF":"Chilean Unit of Account (UF)",
    "CLP":"Chilean Peso",
    "CNY":"Chinese Yuan",
    "COP":"Colombian Peso",
    "CRC":"Costa Rican Col\u00f3n",
    "CUC":"Cuban Convertible Peso",
    "CUP":"Cuban Peso",
    "CVE":"Cape Verdean Escudo",
    "CZK":"Czech Republic Koruna",
    "DJF":"Djiboutian Franc",
    "DKK":"Danish Krone",
    "DOP":"Dominican Peso",
    "DZD":"Algerian Dinar",
    "EEK":"Estonian Kroon",
    "EGP":"Egyptian Pound",
    "ERN":"Eritrean Nakfa",
    "ETB":"Ethiopian Birr",
    "EUR":"Euro",
    "FJD":"Fijian Dollar",
    "FKP":"Falkland Islands Pound",
    "GBP":"British Pound Sterling",
    "GEL":"Georgian Lari",
    "GGP":"Guernsey Pound",
    "GHS":"Ghanaian Cedi",
    "GIP":"Gibraltar Pound",
    "GMD":"Gambian Dalasi",
    "GNF":"Guinean Franc",
    "GTQ":"Guatemalan Quetzal",
    "GYD":"Guyanaese Dollar",
    "HKD":"Hong Kong Dollar",
    "HNL":"Honduran Lempira",
    "HRK":"Croatian Kuna",
    "HTG":"Haitian Gourde",
    "HUF":"Hungarian Forint",
    "IDR":"Indonesian Rupiah",
    "ILS":"Israeli New Sheqel",
    "IMP":"Manx pound",
    "INR":"Indian Rupee",
    "IQD":"Iraqi Dinar",
    "IRR":"Iranian Rial",
    "ISK":"Icelandic Kr\u00f3na",
    "JEP":"Jersey Pound",
    "JMD":"Jamaican Dollar",
    "JOD":"Jordanian Dinar",
    "JPY":"Japanese Yen",
    "KES":"Kenyan Shilling",
    "KGS":"Kyrgystani Som",
    "KHR":"Cambodian Riel",
    "KMF":"Comorian Franc",
    "KPW":"North Korean Won",
    "KRW":"South Korean Won",
    "KWD":"Kuwaiti Dinar",
    "KYD":"Cayman Islands Dollar",
    "KZT":"Kazakhstani Tenge",
    "LAK":"Laotian Kip",
    "LBP":"Lebanese Pound",
    "LKR":"Sri Lankan Rupee",
    "LRD":"Liberian Dollar",
    "LSL":"Lesotho Loti",
    "LTL":"Lithuanian Litas",
    "LVL":"Latvian Lats",
    "LYD":"Libyan Dinar",
    "MAD":"Moroccan Dirham",
    "MDL":"Moldovan Leu",
    "MGA":"Malagasy Ariary",
    "MKD":"Macedonian Denar",
    "MMK":"Myanma Kyat",
    "MNT":"Mongolian Tugrik",
    "MOP":"Macanese Pataca",
    "MRO":"Mauritanian Ouguiya",
    "MUR":"Mauritian Rupee",
    "MVR":"Maldivian Rufiyaa",
    "MWK":"Malawian Kwacha",
    "MXN":"Mexican Peso",
    "MYR":"Malaysian Ringgit",
    "MZN":"Mozambican Metical",
    "NAD":"Namibian Dollar",
    "NGN":"Nigerian Naira",
    "NIO":"Nicaraguan C\u00f3rdoba",
    "NOK":"Norwegian Krone",
    "NPR":"Nepalese Rupee",
    "NZD":"New Zealand Dollar",
    "OMR":"Omani Rial",
    "PAB":"Panamanian Balboa",
    "PEN":"Peruvian Nuevo Sol",
    "PGK":"Papua New Guinean Kina",
    "PHP":"Philippine Peso",
    "PKR":"Pakistani Rupee",
    "PLN":"Polish Zloty",
    "PYG":"Paraguayan Guarani",
    "QAR":"Qatari Rial",
    "RON":"Romanian Leu",
    "RSD":"Serbian Dinar",
    "RUB":"Russian Ruble",
    "RWF":"Rwandan Franc",
    "SAR":"Saudi Riyal",
    "SBD":"Solomon Islands Dollar",
    "SCR":"Seychellois Rupee",
    "SDG":"Sudanese Pound",
    "SEK":"Swedish Krona",
    "SGD":"Singapore Dollar",
    "SHP":"Saint Helena Pound",
    "SLL":"Sierra Leonean Leone",
    "SOS":"Somali Shilling",
    "SRD":"Surinamese Dollar",
    "STD":"S\u00e3o Tom\u00e9 and Pr\u00edncipe Dobra",
    "SVC":"Salvadoran Col\u00f3n",
    "SYP":"Syrian Pound",
    "SZL":"Swazi Lilangeni",
    "THB":"Thai Baht",
    "TJS":"Tajikistani Somoni",
    "TMT":"Turkmenistani Manat",
    "TND":"Tunisian Dinar",
    "TOP":"Tongan Pa\u02bbanga",
    "TRY":"Turkish Lira",
    "TTD":"Trinidad and Tobago Dollar",
    "TWD":"New Taiwan Dollar",
    "TZS":"Tanzanian Shilling",
    "UAH":"Ukrainian Hryvnia",
    "UGX":"Ugandan Shilling",
    "USD":"United States Dollar",
    "UYU":"Uruguayan Peso",
    "UZS":"Uzbekistan Som",
    "VEF":"Venezuelan Bol\u00edvar Fuerte",
    "VND":"Vietnamese Dong",
    "VUV":"Vanuatu Vatu",
    "WST":"Samoan Tala",
    "XAF":"CFA Franc BEAC",
    "XAG":"Silver (troy ounce)",
    "XAU":"Gold (troy ounce)",
    "XCD":"East Caribbean Dollar",
    "XDR":"Special Drawing Rights",
    "XOF":"CFA Franc BCEAO",
    "XPF":"CFP Franc",
    "YER":"Yemeni Rial",
    "ZAR":"South African Rand",
    "ZMK":"Zambian Kwacha (pre-2013)",
    "ZMW":"Zambian Kwacha",
    "ZWL":"Zimbabwean Dollar"
  }
	currencyFact = {};
	
	currencyFact.getCurrencies = function(){
		return currencyArr;
	}
	
		currencyFact.defaultCodes = 
			['USD', 'EUR', 'CAD', 'SAR', 'PKR', 'AED',  'CNY', 'JPY', 'SGD', 'BDT', 'ILS', 'IRR', 'AFN', 'TRY', 'TWD', 'MYR', 'RUB', 'UAH', 'KRW', 'IQD' ];
	return currencyFact;
});

app.factory('histCurrencyApiFactory', ['$http', 'baseURL3', 'apikey', function($http, baseURL3, apikey){
	var currencyFactory = {};
	var currencyRates = {};
	
	currencyFactory.getHistRates = function(currency, date){
		//console.log(currencyRates["USD" + input]);
		var params = {
			access_key : apikey,
			format : 1,
			currencies : currency,
			date : date
			};
		return $http.get(baseURL3, {params: params});
	};
	currencyFactory.years = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'
	,'2012', '2013', '2014', '2015'];
	
	currencyFactory.dates = ['-01-01', '-02-01', '-03-01', '-04-01', '-05-01', '-06-01', '-07-01', '-08-01', '-09-01', '-10-01', '-11-01','-12-01' ];
	
	currencyFactory.months = {
			"01" : "Jan", "02" : "Feb", "03" : "Mar", "04" : "Apr", "05" : "May", "06" : "Jun", "07" : "Jul", "08" : "Aug", "09" : "Sep", "10" : "Oct",
			"11": "Nov", "12" : "Dec"
		
	}
	return currencyFactory;
}]);

app.factory('chartFactory',function(){
	var chart = {};
	
	chart.draw = function(rates){
		var arr = [];
		var curr = rates[0].currency;
		rates.sort(function (a, b) {
		  if (a.month > b.month) {
			 return 1;
		  }
		  if (a.month < b.month) {
			 return -1;
		  }
		  // a must be equal to b
		  return 0;
		});
		console.log(rates);
		
		for (var i = 0; i < 12; ++i){
			arr.push(rates[i].rate);
		}
		console.log(arr);	
		
		
		Highcharts.chart('chart', {
        title: {
            text: 'Monthly Currency Rate of ' + curr,
            x: -20 //center
        },
        subtitle: {
            text: 'Source: currencyLayer.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Currency Rate '
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' ' + curr
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: curr,
            data: arr
        
        }]
    });	
	}
	
		return chart;
	
});

