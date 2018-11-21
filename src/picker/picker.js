import {createTemplate} from './templ.js';
import {getMonthData} from './data.js';
import './style.scss';

const defaultOptions = () => {
	return {
		defaultTime: formatTime(new Date()),
		$el: null
	}
}
export default class Picker {
	/*options: {defaultTime: , $el: }*/
	constructor(options) {
		// if(!options.$el); error
		this.defaultVal = options.defaultTime;
		this.$el = options.$el; //输入框元素
		this.$wrapper = null;	//包裹层
		this.once = true;
		this.isShow = false;
		this.currentSelect = this.defaultVal;	//当前选择的时间

		this.init();
	}

	init() {
		this.initCurrentTime();
		this.render();
		this.initEvent();
	}
	initCurrentTime() {
		let time = new Date(this.currentSelect);
		this.year = time.getFullYear();
		this.month = time.getMonth() + 1;
		this.date = time.getDate();
		this.time = this.year + '-' + this.month + '-' + this.date;
	}
	render() {
		this.monthData = getMonthData.call(this);

		let html = createTemplate(this.year, this.month, this.monthData);

		if(!this.$wrapper) {
			this.$wrapper = document.createElement('div');
			this.$wrapper.className = 'x-datepicker-wrapper';
			document.body.appendChild(this.$wrapper);
		}

		this.$wrapper.innerHTML = html;
	}
	initEvent() {
		let $dom = this.$el, $wrapper = this.$wrapper, _this = this;
		$dom.addEventListener('click', () => {
			if(!_this.isShow) _this.show();
			else _this.hide();
		}, false);

		$wrapper.addEventListener('click', (e) => {
			let target = e.target;
			if(target.classList.contains('x-datepicker-td')) { //选取时间
				_this.currentSelect = target.dataset.xTime;
				_this.$el.value = _this.currentSelect;
				//激活状态
				let activeElem = document.querySelector('.x-datepicker-td.active');
				
				activeElem && activeElem.classList.remove('active');
				
				target.classList.add('active');
				//更新当前时间数据
				_this.initCurrentTime();

				_this.hide();
			}

			if(target.className == 'x-datepicker-btn prev') {	//上一个月
				this.prev();
			}
			if(target.className == 'x-datepicker-btn next') {	//下一个月
				this.next();
			}
		}, false);
	}
	show() {
		this.$wrapper.classList.add('show');
		this.isShow = true;
	}
	hide() {
		this.$wrapper.classList.remove('show');
		this.isShow = false;
	}
	prev() {
		this.month--;
		if(this.month < 1) {
			this.month = 12;
			this.year--;
		}
		this.render();
	}
	next() {
		this.month++;
		if(this.month > 12) {
			this.month = 1;
			this.year++;
		}
		this.render();
	}
	
}

function format(year, month, realDay) {
	return year + '-' + month + '-' + realDay;
}