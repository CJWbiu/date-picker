export function getMonthData(year, month, day) {
	let result = [];
	if(!year || !month || !day) {
		year = this.year;
		month = this.month;
		day = this.date;
	}

	//当月第一天的星期
	let firstDay = new Date(year, month-1, 1);
	let firstDayOfWeek = firstDay.getDay();
	//周末
	if(firstDayOfWeek === 0) firstDayOfWeek = 7;
	//有多少上月数据
	let lastDaysOfLastMonth = firstDayOfWeek - 1; 
	//当月最后一天日期
	let lastDayOfMonth = new Date(year, month, 0);
	let lastDateOfMonth = lastDayOfMonth.getDate();
	//上月最后一天
	let lastDateOfLastMonth = new Date(year, month-1, 0).getDate();

	for(let i = 0; i < 42; i ++) {
		let thisMonth = month, thisYear = year, realDay, isCurrentMonth = true, showDate, active = false, isNow = false;
		if(i < lastDaysOfLastMonth) {	//上月
			realDay = lastDateOfLastMonth - lastDaysOfLastMonth + i + 1;
			thisMonth = month - 1;
			isCurrentMonth = false;
			if(thisMonth <= 0) {
				thisMonth = 12;
				thisYear = year - 1;
			}
		}else if(i < lastDateOfMonth + lastDaysOfLastMonth) { //当月
			realDay = i + 1 - lastDaysOfLastMonth;
		}else {	//下月
			realDay = i + 1 - lastDateOfMonth - lastDaysOfLastMonth;
			thisMonth = month + 1;
			if(thisMonth > 12) {
				thisMonth = 1;
				thisYear = year + 1;
			}
			isCurrentMonth = false;
		}

		showDate = format(thisYear, thisMonth, realDay);

		let nowDate = new Date();
		let now = format(nowDate.getFullYear(), nowDate.getMonth()+1, nowDate.getDate());
		if(showDate == now) isNow = true;
		if(showDate == this.currentSelect) active = true;

		result.push({
			index: i,
			showDate: showDate,
			realDay: realDay,
			month: thisMonth,
			year: thisYear,
			isCurr: isCurrentMonth,
			active: active,
			isNow: isNow
		})
	}
	return result;
}

function format(year, month, realDay) {
	return year + '-' + month + '-' + realDay;
}