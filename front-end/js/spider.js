class Spider {
	init(title_arr, author_arr, year_arr, threads, sid, tabid) {
		let n = title_arr.length;
		this.is_start = true;
		this.threads = threads;
		this.interval = null;
		this.sid = sid;
		this.after_end_tad_id = tabid;
		
		this.qid_arr = [];
		this.refid_arr = [];
		this.title_arr = title_arr;
		this.author_arr = author_arr;
		this.year_arr = year_arr;
		this.journal_arr = new Array(n).join(',').split(',');
		
		this.search_datas = new Array(n).join(',').split(',');
		this.cite_refine_datas = new Array(n).join(',').split(',');
		this.detail_tables = new Array(n).join(',').split(',');
		this.journal_tables = new Array(n).join(',').split(',');

		this.search_states = new Array(n).join(',').split(',').map( e => [0, 0, 0, 0, 0] ); // search, cite-refine, detail，journal: -1/0/1/2， error/undo/doing/done; is-done: 0/1，undo/done;
		this.cite_num_arr = new Array(n).join(',').split(',').map( e => [0, 0] );
		
		this.search_url = `https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com/WOS_GeneralSearch.do?fieldCount=1&action=search&product=WOS&search_mode=GeneralSearch&SID=${this.sid}&max_field_count=25&max_field_notice=%E6%B3%A8%E6%84%8F%3A+%E6%97%A0%E6%B3%95%E6%B7%BB%E5%8A%A0%E5%8F%A6%E4%B8%80%E5%AD%97%E6%AE%B5%E3%80%82&input_invalid_notice=%E6%A3%80%E7%B4%A2%E9%94%99%E8%AF%AF%3A+%E8%AF%B7%E8%BE%93%E5%85%A5%E6%A3%80%E7%B4%A2%E8%AF%8D%E3%80%82&exp_notice=%E6%A3%80%E7%B4%A2%E9%94%99%E8%AF%AF%3A+%E4%B8%93%E5%88%A9%E6%A3%80%E7%B4%A2%E8%AF%8D%E5%8F%AF%E4%BB%A5%E5%9C%A8%E5%A4%9A%E4%B8%AA%E5%AE%B6%E6%97%8F%E4%B8%AD%E6%89%BE%E5%88%B0+%28&input_invalid_notice_limits=+%3Cbr%2F%3E%E6%B3%A8%E6%84%8F%3A+%E6%BB%9A%E5%8A%A8%E6%A1%86%E4%B8%AD%E6%98%BE%E7%A4%BA%E7%9A%84%E5%AD%97%E6%AE%B5%E5%BF%85%E9%A1%BB%E8%87%B3%E5%B0%91%E4%B8%8E%E4%B8%80%E4%B8%AA%E5%85%B6%E4%BB%96%E6%A3%80%E7%B4%A2%E5%AD%97%E6%AE%B5%E7%9B%B8%E7%BB%84%E9%85%8D%E3%80%82&sa_params=WOS%7C%7C7AVrjhmEcJpyJsy2QBT%7Chttp%3A%2F%2Fapps.webofknowledge.com%7C%27&formUpdated=true&value%28input1%29=_title_&value%28select1%29=TI&value%28hidInput1%29=&limitStatus=collapsed&ss_lemmatization=On&ss_spellchecking=Suggest&SinceLastVisit_UTC=&SinceLastVisit_DATE=&period=Range+Selection&range=ALL&startYear=1985&endYear=2020&editions=SCI&editions=SSCI&editions=AHCI&editions=ISTP&editions=ESCI&editions=CCR&editions=IC&update_back2search_link_param=yes&ssStatus=display%3Anone&ss_showsuggestions=ON&ss_numDefaultGeneralSearchFields=1&ss_query_language=&rs_sort_by=PY.D%3BLD.D%3BSO.A%3BVL.D%3BPG.A%3BAU.A`; // sid, title
		this.cite_url = `https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com+CitingArticles.do?product=WOS&SID=${this.sid}&search_mode=CitingArticles&parentProduct=WOS&parentQid=_qid_&parentDoc=1&REFID=_refid_&logEventUT=WOS:000340351500004&excludeEventConfig=ExcludeIfFromNonInterProduct&cacheurlFromRightClick=no`; // sid, qid, refid,
		this.cite_50_url = `https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com+summary.do?product=WOS&parentProduct=WOS&search_mode=CitingArticles&qid=_qid_&SID=${this.sid}&&page=1&action=changePageSize&pageSize=_size_`; // qid, sid, size=10/25/50.

		this.detail_url = `https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com+OutboundService.do?action=go&displayCitedRefs=true&displayTimesCited=true&displayUsageInfo=true&viewType=summary&product=WOS&mark_id=WOS&colName=WOS&search_mode=GeneralSearch&locale=zh_CN&view_name=WOS-summary&sortBy=PY.D%3BLD.D%3BSO.A%3BVL.D%3BPG.A%3BAU.A&mode=outputService&qid=_qid_&SID=${this.sid}&format=formatForPrint&filters=HIGHLY_CITED+HOT_PAPER+OPEN_ACCESS+PMID+USAGEIND+AUTHORSIDENTIFIERS+ACCESSION_NUM+FUNDING+SUBJECT_CATEGORY+JCR_CATEGORY+LANG+IDS+PAGEC+SABBR+CITREFC+ISSN+PUBINFO+KEYWORDS+CITTIMES+ADDRS+CONFERENCE_SPONSORS+DOCTYPE+ABSTRACT+CONFERENCE_INFO+SOURCE+TITLE+AUTHORS++&selectedIds=&mark_to=1&mark_from=1&queryNatural=%3Cb%3E%E6%A0%87%E9%A2%98%3A%3C%2Fb%3E+(_title_)&count_new_items_marked=0&MaxDataSetLimit=&use_two_ets=false&DataSetsRemaining=&IsAtMaxLimit=&IncitesEntitled=yes&value(record_select_type)=range&markFrom=1&markTo=1&fields_selection=HIGHLY_CITED+HOT_PAPER+OPEN_ACCESS+PMID+USAGEIND+AUTHORSIDENTIFIERS+ACCESSION_NUM+FUNDING+SUBJECT_CATEGORY+JCR_CATEGORY+LANG+IDS+PAGEC+SABBR+CITREFC+ISSN+PUBINFO+KEYWORDS+CITTIMES+ADDRS+CONFERENCE_SPONSORS+DOCTYPE+ABSTRACT+CONFERENCE_INFO+SOURCE+TITLE+AUTHORS++&&`; // qid, sid, title
		this.journal_info_url = `http://www.fenqubiao.com/Core/JournalDetail.aspx?y=2019&t=`; // journal.
		
		message.send(this.after_end_tad_id, 'init', {num: n});

		console.log('已初始化' + new Date().getMinutes() + ':' + new Date().getSeconds() );
	}

	async get_search_data(id) {
		console.log(id + 1 + ' : ' + '正在搜索' + new Date().getMinutes() + ':' + new Date().getSeconds() );
		this.search_states[id][0] = 1;
		let search_url = this.search_url.replace('_title_', this.title_arr[id]);
		await axios.get(search_url).then( res => {
			let records = res.data.match(/id="RECORD_\d+/g);
			let info = '';
			if( records ) {
				if( records.length === 1 ) {
					info = 'success';
					this.search_states[id][0] = 2;
					let data = res.data.replace(/(\r\n|\r|\n)/g, '').match(/<div class="search-results">.*?name="LinksAreAllowedRightClick" value="CitedPatent\.do"/)[0];
					this.journal_arr[id] = data.match(/<value>(.*?)<\/value>/)[1];
					this.search_datas[id] = this.search_result_format(data);
					this.qid_arr[id] = parseInt(res.data.match(/qid=(\d+)/)[1]);
					if( !res.data.includes('<a class="snowplow-times-cited-link"') ) { // 0引用
						info = 'success & no cite';
						this.search_states[id][1] = 2;
					} else {
						this.refid_arr[id] = res.data.match(/REFID=(\d+)/)[1];   // 此参数应该是参考文献列表查询id，因此0引用，没有此参数。
					}
				} else {
					info = 'not unique';
					this.search_states[id][0] = -1;
				}
			} else {
				info = 'not found';
				this.search_states[id][0] = -1;
			}

			if( info !== 'success' ) {
				this.search_states[id][4] = 1;
			}

			console.log( `${id + 1} :${info}` + new Date().getMinutes() + ':' + new Date().getSeconds() );
		})
	}

	async get_cite_data(id) {
		console.log(id + 1 + ' : ' + '正在获取引用文献' + new Date().getMinutes() + ':' + new Date().getSeconds() );
		this.search_states[id][1] = 1;
		let cite_url = this.cite_url.replace('_qid_', this.qid_arr[id])
			.replace('_refid_', this.refid_arr[id]);
		let res = await axios.get(cite_url);
		let data = res.data.replace(/(\r\n|\r|\n)/g, '');
		let records = data.match(/id="RECORD_\d+/g);
		if( records ) { 
			// 判断引用文献中是否含有所需年份内发表的，如果有，计算出最大引用量：即所需最小年份以后的引用量,从而确定爬取页数。
			let year_num = data.match(/\d{4}\s\(\d+\)<\/label>/g);
			let year_arr = year_num.map( s => parseInt( s.slice(0, 4) ) );
			let num_arr = year_num.map( s => parseInt( s.slice(6, 8) ));
			let intersect = this.year_arr.filter( y => year_arr.includes(y) );
			if( intersect.length > 0 ) {
				let min_intersect_year = Math.min(...intersect);
				let index = year_arr.indexOf(min_intersect_year);
				let sum = 0;
				for(let i=0; i<=index; i++) {
					sum += num_arr[i];
				}
				data = data.replace(/(\r\n|\r|\n)/g, '').match(/<div class="search-results">.*?name="LinksAreAllowedRightClick" value="CitedPatent\.do"/)[0];
				if( sum < 26 && sum > 11 ) {
					let cite_50_url = this.cite_50_url.replace('_qid_', this.qid_arr[id] + 1)
							.replace('_size_', 25);
					let res = await axios.get(cite_50_url);
					data += res.data.replace(/(\r\n|\r|\n)/g, '').match(/<div class="search-results">.*?name="LinksAreAllowedRightClick" value="CitedPatent\.do"/g)[1];
				} else {
					let pages = Math.floor(sum/50);
					let cite_50_url = this.cite_50_url.replace('_qid_', this.qid_arr[id] + 1)
							.replace('_size_', 50);
					res = await axios.get(cite_50_url);
					data += res.data.replace(/(\r\n|\r|\n)/g, '').match(/<div class="search-results">.*?name="LinksAreAllowedRightClick" value="CitedPatent\.do"/g)[1];
					for(let i=0; i<pages; i++) {
						let next_page_url = res.data.match(/class="paginationNext.*?href="(.*?)"/)[1].replace(/amp;/g, '');
						res = await axios.get(next_page_url);
						let matches = res.data.replace(/(\r\n|\r|\n)/g, '').match(/<div class="search-results">.*?name="LinksAreAllowedRightClick" value="CitedPatent\.do"/g);
						data += matches[0] + matches[1];
					}
				}
				let ele = this.refine_cite_data(data);
				data = this.get_cite_num(ele, id);
				this.cite_refine_datas[id] = this.search_result_format(data);
				this.search_states[id][1] = 2;
			} else {
				this.search_states[id][1] = 2;
				this.search_states[id][4] = 1;
			}
		} else {
			this.search_states[id][1] = -1;
			this.search_states[id][4] = 1;
		}
	}

	get_detail_data(id) {
		console.log(id + 1 + ' : ' + '抓取详情页' + new Date().getMinutes() + ':' + new Date().getSeconds() );
		this.search_states[id][2] = 1;
		let detail_url = this.detail_url.replace('_qid_', this.qid_arr[id])
			.replace('_title_', this.title_arr[id]);
		return axios.get(detail_url).then( res => {
			if( true ) { // 判断是否成功。
				this.search_states[id][2] = 2;
				this.detail_tables[id] = this.detail_table_format(res.data);
			} else {
				this.search_states[id][2] = -1;
			}
			console.log(id + 1 + ' : ' + '已经完成详情页处理' + new Date().getMinutes() + ':' + new Date().getSeconds() );
		})
	}

	get_journal_data(id) { 
		console.log(id + 1 + ' : ' + '正在获取期刊分区数据' + new Date().getMinutes() + ':' + new Date().getSeconds() );
		this.search_states[id][3] = 1;
		let journal_info_url = this.journal_info_url + this.journal_arr[id];
		return axios.get(journal_info_url).then( res => {
			let data = this.journal_table_format(res.data);
			if( data !== '' ) {
				this.search_states[id][3] = 2;
				this.journal_tables[id] = data;
			} else {
				this.search_states[id][3] = -1;
			}
			console.log(id + 1 + ' : ' + '已经完成期刊分区处理' + new Date().getMinutes() + ':' + new Date().getSeconds() );
		})
	}

	search_result_format(data) {
		let body = document.createElement('div');
		body.innerHTML = data;
		data = body.querySelector('.search-results');
		data.style.padding = '25px';
		for(let e of body.getElementsByClassName("nodisplay") ) { e.parentElement.removeChild(e) }
		[	body.querySelectorAll('*[style="display: none"]'),
			body.querySelectorAll('script'),
			body.querySelectorAll('*[type="hidden"]'),
			body.querySelectorAll('*[style="display: none;"]'),
			body.querySelectorAll('.search-results-checkbox'),
			body.querySelectorAll('.alum'),
			body.querySelectorAll('span.smallV110')
		].filter( e => e.length > 0 )
	 	.forEach( eles => eles.forEach( e => e.parentElement.removeChild(e) ) );

		body.querySelectorAll('.search-results-content').forEach( e => {
		 	[1, 2, 3, 4, 5].forEach( () => {
		 		if( e.children[3])
		 			e.removeChild(e.children[3])
		 	});
		})	

		body.querySelectorAll('.search-results-data-icon').forEach( e => {
			e.previousSibling.innerHTML += '<br><span class="high-cite">高被引</span>';
			e.parentElement.removeChild(e);
		})
		body.querySelectorAll('a.smallV110').forEach( e => e.innerHTML = e.innerText );
		body.querySelectorAll('.search-results-number').forEach( e => e.innerHTML = e.innerText );
		['href', 'url', 'onclick', 'alt', 'title', 'oncontextmenu', 'hasautosubmit', 'name'].forEach( attr => {
			body.querySelectorAll(`*[${attr}]`).forEach( e => e.removeAttribute(attr) );
		})
		return body.innerHTML;
	}

	refine_cite_data(data) {
		let body = document.createElement('div');
		let div = document.createElement('div');
		let sub_div = document.createElement('div');
		sub_div.setAttribute('class', 'search-results');
		div.appendChild(sub_div);
		body.innerHTML = data;
		let id_arr = data.match(/RECORD_\d+/g);
		for( let id of id_arr ) {
			let ele = body.querySelector(`#${id}`);
			let year = ele.innerHTML.replace(/(\r|\n|\r\n)/g, '').match(/出版年.*?(\d{4})/);
			if( year ) {
				if( this.year_arr.includes( parseInt(year[1]) ) ) {
					sub_div.appendChild(ele);
				}
			} // 未出版的不考虑。
		}
		return div;
	}

	get_cite_num(body, id) {
		let self_cite_num = 0, other_cite_num = 0;
		body.querySelectorAll('.search-results-content').forEach( author_div => {
			let authors = [];
			author_div.children[1].querySelectorAll('a').forEach( a => {
				authors.push( a.innerHTML.replace(/(-|,|\s|\.)/g, '') );
    		})
    		let author_union = new Set([...authors, ...this.author_arr]);
    		if( author_union.size === (authors.length + this.author_arr.length) ) {
    			author_div.nextElementSibling.firstElementChild.innerHTML += `<br><span class='cite-num'>被引</span>`;
				other_cite_num += 1;
    		} else {
    			author_div.nextElementSibling.firstElementChild.innerHTML += `<br><span class='cite-num'>自引</span>`;
				self_cite_num += 1;
    		}
		})
		this.cite_num_arr[id] = [other_cite_num, self_cite_num];
		return body.innerHTML;
	}

	detail_table_format(data) {
		let body = document.createElement('div');
		body.innerHTML = data;
		data = body.querySelectorAll('table');
		if( data[2] ) {
			body.innerHTML = '';
			body.appendChild(data[2]);
			data[2].style.margin = '50px';
			body.setAttribute('class', 'printWhitePage');
			return body.innerHTML;
		}
	}

	journal_table_format(data) {
		let body = document.createElement('div');
		body.innerHTML = data;
		let journalDetail = body.querySelector('#detailJournal');
		if( journalDetail ) {
			body.innerHTML = '';
			journalDetail.removeAttribute('id');
			journalDetail.style.padding = '5px 40px';
			body.appendChild(journalDetail);
			return body.innerHTML;
		} else {
			return '';
		}
	}

	start() {
		let n = Math.min(this.threads, this.title_arr.length);
		for(let i=0; i<n; i++) {
			this.crawl(i);
		}
	}

	crawl(id) {
		console.log(`${id + 1} : 个开始运行` + new Date().getMinutes() + ':' + new Date().getSeconds() );
		this.get_search_data(id).then( () => {
		if( this.search_states[id][0] == 2 && this.search_states[id][4] == 0 ) {
			this.get_cite_data(id).then( () => {
			if( this.search_states[id][1] === 2 && this.search_states[id][4] === 0 ) {
				this.get_detail_data(id).then( () => {
				if( !this.search_states[id].includes(1) ) {
					this.search_states[id][4] = 1;
					this.render(id);
					this.next();
				}
				});
				this.get_journal_data(id).then( () => {
				if( !this.search_states[id].includes(1) ) {
					this.search_states[id][4] = 1;
					this.render(id);
					this.next();
				}
				});
			} else if( this.search_states[id][4] == 1 ) {
				this.render(id);
				this.next();
			}
			});
		} else if( this.search_states[id][4] == 1 ) {
			this.render(id);
			this.next();
		}
		})
	}

	next() {
		let n = this.search_states.length;
		let finished_num = 0;
		for(let i=0; i<n; i++) {
			if( this.search_states[i][0] === 0 ) {
				this.crawl(i);
				return
			} else if( this.search_states[i][4] === 1 ) {
				finished_num += 1;
			}
		}
		
		if( finished_num === n ) {
			this.done();
		}
	}

	render(id) {
		let state = this.search_states[id];
		let div1 = '';
		div1 += `<h2>${id + 1} ： ${this.title_arr[id]}</h2>`;
		if( state[0] === 2 ) {
			div1 += this.search_datas[id];
			if( state[1] === 2 ) {
				div1 += `<div class="cite_num_">自引：${this.cite_num_arr[id][1]}，&nbsp;&nbsp;&nbsp; 被引：${this.cite_num_arr[id][0]}</div>`;
			}
			if( state[3] === 2 ) {
				div1 += this.journal_tables[id];
			} else if( state[3] === -1 ) {
				div1 += '<div class="error">获取期刊分区出错了。</div>';
			}
			div1 += '<div style="page-break-after: always;"></div>';
		} else {
			div1 += '<div class="error">搜索出错了。</div>';
		}

		let div2 = '';
		if( state[1] === 2 ) {
			let cite_num = this.cite_num_arr[id][0] + this.cite_num_arr[id][1];
			if( cite_num > 0 ) {
				div2 += `<h3>${id + 1} ： ${this.title_arr[id]}</h3>`;				
				div2 += `<div class="cite_num_">总引用量：${ cite_num }</div>`;
				div2 += this.cite_refine_datas[id];
				div2 += '<div style="page-break-after: always;"></div>';
			}
		} else if( state[1] === -1 ){
			div2 += '<div class="error">获取引用数据出错了。</div>';
		}
		if( state[2] === 2 ) {
			div2 += this.detail_tables[id];
			div2 += '<div style="page-break-after: always;"></div>';
		} else if( state[2] === -1 ) {
			div2 += '<div class="error">获取详情页数据出错了。</div>';
		}

		message.send(this.after_end_tad_id, 'render', {id: id, div1: div1, div2: div2});
	}

	done() {
		this.is_start = false;
		console.log(this);
		message.send(this.after_end_tad_id, 'done', {});
	}
}


function get_data() {
	// return axios.get('https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com/WOS_GeneralSearch.do?fieldCount=1&action=search&product=WOS&search_mode=GeneralSearch&SID=6EuUympOfp3mZydOGqr&max_field_count=25&max_field_notice=%E6%B3%A8%E6%84%8F%3A+%E6%97%A0%E6%B3%95%E6%B7%BB%E5%8A%A0%E5%8F%A6%E4%B8%80%E5%AD%97%E6%AE%B5%E3%80%82&input_invalid_notice=%E6%A3%80%E7%B4%A2%E9%94%99%E8%AF%AF%3A+%E8%AF%B7%E8%BE%93%E5%85%A5%E6%A3%80%E7%B4%A2%E8%AF%8D%E3%80%82&exp_notice=%E6%A3%80%E7%B4%A2%E9%94%99%E8%AF%AF%3A+%E4%B8%93%E5%88%A9%E6%A3%80%E7%B4%A2%E8%AF%8D%E5%8F%AF%E4%BB%A5%E5%9C%A8%E5%A4%9A%E4%B8%AA%E5%AE%B6%E6%97%8F%E4%B8%AD%E6%89%BE%E5%88%B0+%28&input_invalid_notice_limits=+%3Cbr%2F%3E%E6%B3%A8%E6%84%8F%3A+%E6%BB%9A%E5%8A%A8%E6%A1%86%E4%B8%AD%E6%98%BE%E7%A4%BA%E7%9A%84%E5%AD%97%E6%AE%B5%E5%BF%85%E9%A1%BB%E8%87%B3%E5%B0%91%E4%B8%8E%E4%B8%80%E4%B8%AA%E5%85%B6%E4%BB%96%E6%A3%80%E7%B4%A2%E5%AD%97%E6%AE%B5%E7%9B%B8%E7%BB%84%E9%85%8D%E3%80%82&sa_params=WOS%7C%7C7AVrjhmEcJpyJsy2QBT%7Chttp%3A%2F%2Fapps.webofknowledge.com%7C%27&formUpdated=true&value%28input1%29=Riemann-Hilbert approach and N-soliton solutions for a generalized Sasa-Satsuma equation&value%28select1%29=TI&value%28hidInput1%29=&limitStatus=collapsed&ss_lemmatization=On&ss_spellchecking=Suggest&SinceLastVisit_UTC=&SinceLastVisit_DATE=&period=Range+Selection&range=ALL&startYear=1985&endYear=2020&editions=SCI&editions=SSCI&editions=AHCI&editions=ISTP&editions=ESCI&editions=CCR&editions=IC&update_back2search_link_param=yes&ssStatus=display%3Anone&ss_showsuggestions=ON&ss_numDefaultGeneralSearchFields=1&ss_query_language=&rs_sort_by=PY.D%3BLD.D%3BSO.A%3BVL.D%3BPG.A%3BAU.A').then( res => {
		// let qid = parseInt(res.data.match(/qid=(\d+)/)[1]);
		// let refid = res.data.match(/REFID=(\d+)/)[1];
		axios.get(`https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com+CitingArticles.do?product=WOS&SID=8DmR2x785pYk4aAaSBZ&search_mode=CitingArticles&parentProduct=WOS&parentQid=2&parentDoc=2&REFID=469852762&logEventUT=WOS:000334404800007&excludeEventConfig=ExcludeIfFromNonInterProduct&cacheurlFromRightClick=no`).then( res => {
			axios.get(`https://vpn2.zzu.edu.cn/,DanaInfo=apps.webofknowledge.com+summary.do?product=WOS&parentProduct=WOS&search_mode=CitingArticles&qid=4&SID=8DmR2x785pYk4aAaSBZ&&page=1&action=changePageSize&pageSize=50`).then( res => {
				let next_page_url = res.data.match(/class="paginationNext.*?href="(.*?)"/)[1].replace(/amp;/g, '');
				axios.get(next_page_url).then( res => {
					console.log(res);
				})

			})	
		})
	// })
}

// get_data();