		//基础数组为数字1-9
		var baseArr = [1,2,3,4,5,6,7,8,9];
		var sudokuArr = createNewArr();
		//重新产生起始数组
		function createNewArr() {
			var sudokuArr = new Array(9);
			for (var i = 0;i < sudokuArr.length;i++) {
				sudokuArr[i] = new Array(9);
			}
			sudokuArr[0] = shuffle();
			return sudokuArr;
		}
		
		
		//计算生产数独的时间
		function calTime(){
			var beginTime = +new Date();
			get9Grid();
			var endTime = +new Date();
			console.log("生成数独用时共计"+(endTime-beginTime)+"ms");
		}
		
		
		
		
		//生产数独
		function get9Grid() {
		try{
			sudokuArr = createNewArr();
			//第一排已经自动生成了，所以从第二排开始
			for(var i = 1; i < 9; i++) {
				for(var j = 0; j <9; j++) {
					//分别找到3宫格，行和列已经存在的数字
					var centerXY = getCenter(i,j);
					var arr1 = get3Grid(centerXY[0],centerXY[1]);
					var arr2 = isXRepeat(j,sudokuArr);
					var arr3 = isYRepeat(i,sudokuArr);
					//找到可以使用的数字
					var ableArr = baseArr.diff(arr1.intersect(arr2.intersect(arr3)));
					if(ableArr.length == 0){
						get9Grid();
						return;
					}
					
					var item;
					item = ableArr[Math.floor(Math.random()*(ableArr.length))];

					sudokuArr[i][j] = item;
				}
			}
		}catch(e){
			get9Grid();
		}
			console.log(sudokuArr);
			showTable();
		}
		
		//把1-9随机排列的算法
		function shuffle(){
			var arr = [1,2,3,4,5,6,7,8,9];
			var len = arr.length;
			for(var i = 0; i < len - 1; i++){
				var idx = Math.floor(Math.random() * (len - i));
				var temp = arr[idx];
				arr[idx] = arr[len - i - 1];
				arr[len - i -1] = temp;
			}
			return arr;
		}
		
		//根据坐标获取所在的三宫格的中间坐标
		function getCenter(x,y) {
			var xArr = Math.floor(x/3)*3+1;
			var yArr = Math.floor(y/3)*3+1;
			var center=[xArr,yArr];
			return center;
		}
		
		//根据中间坐标获取这个三宫格的所有值
		function get3Grid(x,y){
			var arr3Grid = [];
			for(var i = x-1; i < (x+2); i++)
				for(var j = y-1; j < (y+2); j++) {
					if(sudokuArr[i][j] == null) continue;
					else {
						arr3Grid.push(sudokuArr[i][j]);
					}
				}
			return arr3Grid;
		}
		
		//把九宫格数组实体化
		function showTable() {
			var html ='<table id="sudokuTable" border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:auto; text-align:center" bordercolor="#111111" width="180">';
			html = html + new Array(10).join('<tr>' + new Array(10).join('<td>1</td>') + '</tr>')+'</table>';
			$("body").prepend(html);
			
			var mytable = document.getElementById("sudokuTable");
			for(var i = 0; i < 9; i++) 
				for(var j = 0; j < 9; j++) {
					if(sudokuArr[i][j]) {
						mytable.rows[i].cells[j].innerHTML = sudokuArr[i][j];
					}
			}
		}
		
		//返回某行的所有值
		function isXRepeat(y,arr) {
			var arry = [];
			for(var i = 0;i < 9; i++) {
				if(arr[i][y] != null) arry.push(arr[i][y]);
			}
			return arry;
		}
		
		//返回某列的所有值
		function isYRepeat(x,arr) {
			var arry = [];
			for(var i = 0;i < 9; i++) {
				if(arr[x][i] != null) arry.push(arr[x][i]);
			}
			return arry;			

		}
		
		//求出两个集合的差集
		Array.prototype.diff = function (arr) {
			return this.filter(function(i) {return arr.indexOf(i) < 0;});
		};
		//求出两个集合的并集
		Array.prototype.intersect = function (arr) {
			var a = this;
			return this.concat(arr.filter(function(i) {return !(a.indexOf(i) >-1);}));
		};
