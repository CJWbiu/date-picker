export function createTemplate(year, month, monthData) {
	let html = `<div class="x-datepicker-header">
      <a href="javascript:;" class="x-datepicker-btn prev">&lt;</a>
      <a href="javascript:;" class="x-datepicker-btn next">&gt;</a>
      <p class="x-datepicker-days">${year + '-' + month}</p>
    </div>
    <div class="x-datepicker-content">
      <table class="x-datepicker-table">
        <thead>
          <tr>
            <th class="x-datepicker-th">一</th>
            <th class="x-datepicker-th">二</th>
            <th class="x-datepicker-th">三</th>
            <th class="x-datepicker-th">四</th>
            <th class="x-datepicker-th">五</th>
            <th class="x-datepicker-th">六</th>
            <th class="x-datepicker-th">七</th>
          </tr>
        </thead>
        <tbody>`;

  for(let i = 0; i < 6; i ++) {
  	let tdHtml = '';
  	for(let j = 0; j < 7; j++) {
  		let date = monthData[i * 7 + j];
  		if(!date.isCurr) {
				tdHtml += `<td data-x-time="${date.showDate}" class="x-datepicker-td not-current">${date.realDay}</td>`;
  		}
  		else {
  			if(date.active) {
  				tdHtml += `<td data-x-time="${date.showDate}" class="x-datepicker-td active">${date.realDay}</td>`;
  			}else if(date.isNow) {
  				tdHtml += `<td data-x-time="${date.showDate}" class="x-datepicker-td now">${date.realDay}</td>`;
  				if(date.active) {
  					tdHtml += `<td data-x-time="${date.showDate}" class="x-datepicker-td now active">${date.realDay}</td>`;
  				}
  			}else {
  				tdHtml += `<td data-x-time="${date.showDate}" class="x-datepicker-td">${date.realDay}</td>`;
  			}
  			
  		}
  	}
    html += `<tr>${tdHtml}</tr>`;
  }
  html += `</tbody>
      </table>
    </div>`;
  
  return html;
}