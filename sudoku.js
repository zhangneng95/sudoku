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
			//如果存在9宫格 则把他删除
			try{
				sudokuArr = createNewArr();
				//第一排已经自动生成了，所以从第二排开始
				for(var i = 1; i < 9; i++) {
					for(var j = 0; j <9; j++) {
						//分别找到3宫格，行和列已经存在的数字
						var centerXY = getCenter(i,j);
						var arr1 = get3Grid(centerXY[0],centerXY[1],sudokuArr);
						var arr2 = isXRepeat(j,sudokuArr);
						var arr3 = isYRepeat(i,sudokuArr);
						//找到可以使用的数字
						var ableArr = baseArr.diff(arr1.intersect(arr2.intersect(arr3)));
						if(ableArr.length == 0){
							get9Grid();
							return;
						}
						var num;
						num = ableArr[Math.floor(Math.random()*(ableArr.length))];
						sudokuArr[i][j] = num;
					}
				}
			}catch(e){
				get9Grid();
			}
			console.log(sudokuArr);
			showTable();
			Blanks();
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
		function get3Grid(x,y,arr){
			var arr3Grid = [];
			for(var i = x-1; i < (x+2); i++)
				for(var j = y-1; j < (y+2); j++) {
					if(arr[i][j] == null) continue;
					else {
						arr3Grid.push(arr[i][j]);
					}
				}
			return arr3Grid;
		}
		
		//把九宫格数组实体化
		function showTable() {
			var mytable = document.getElementById("sudokuTable");
			if(mytable) {
				var parentObj = mytable.parentNode;
				parentObj.removeChild(mytable);
			}
			var html ='<table id="sudokuTable" border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:auto; text-align:center" bordercolor="#111111" width="180">';
			html = html + new Array(10).join('<tr>' + new Array(10).join('<td>1</td>') + '</tr>')+'</table>';
			$("body").prepend(html);
			//数字填入
			var mytable = document.getElementById("sudokuTable");
			for(var i = 0; i < 9; i++) 
				for(var j = 0; j < 9; j++) {
					if(sudokuArr[i][j]) {
						mytable.rows[i].cells[j].innerHTML = sudokuArr[i][j];
					}
			}
			//三宫格边框加粗并且变色
			for(var i = 0; i < 9; i++) {
				mytable.rows[i].cells[0].setAttribute("style",mytable.rows[i].cells[0].getAttribute('style')+";border-left:#1fc63e solid 3px;");
				mytable.rows[i].cells[3].setAttribute("style",mytable.rows[i].cells[3].getAttribute('style')+";border-left:#1fc63e solid 3px;");
				mytable.rows[i].cells[6].setAttribute("style",mytable.rows[i].cells[6].getAttribute('style')+";border-left:#1fc63e solid 3px;");
				mytable.rows[0].cells[i].setAttribute("style",mytable.rows[0].cells[i].getAttribute('style')+";border-top:#1fc63e solid 3px;");
				mytable.rows[3].cells[i].setAttribute("style",mytable.rows[3].cells[i].getAttribute('style')+";border-top:#1fc63e solid 3px;");
				mytable.rows[6].cells[i].setAttribute("style",mytable.rows[6].cells[i].getAttribute('style')+";border-top:#1fc63e solid 3px;");
				mytable.rows[8].cells[i].setAttribute("style",mytable.rows[8].cells[i].getAttribute('style')+";border-bottom:#1fc63e solid 3px;");
				mytable.rows[i].cells[8].setAttribute("style",mytable.rows[i].cells[8].getAttribute('style')+";border-right:#1fc63e solid 3px;");
			}
			document.getElementById("btn_reset").style.visibility="hidden"
			document.getElementById("btn_group").style.visibility="visible"
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
		
		//每个三宫格的中心 挖出两个数字,并使这两个数字可编辑
		function Blanks(){
			var mytable = document.getElementById("sudokuTable");
			for(var i = 0; i < 9; i++) {
				//三宫格中心为[i,j]
				var j = Math.floor(i/3)*3+1;
				var k = (i%3)*3+1;
				var num1 = Math.floor(Math.random()*9);
				var num2 = Math.floor(Math.random()*9);
				do{
					num2 = Math.floor(Math.random()*9);
				}while(num1 == num2)
				mytable.rows[j-1+Math.floor(num1/3)].cells[k-1+(num1%3)].innerHTML = "";
				mytable.rows[j-1+Math.floor(num1/3)].cells[k-1+(num1%3)].contentEditable = "true";
				mytable.rows[j-1+Math.floor(num1/3)].cells[k-1+(num1%3)].style.background = "#eee";
				mytable.rows[j-1+Math.floor(num2/3)].cells[k-1+(num2%3)].innerHTML = "";
				mytable.rows[j-1+Math.floor(num2/3)].cells[k-1+(num2%3)].contentEditable = "true";
				mytable.rows[j-1+Math.floor(num2/3)].cells[k-1+(num2%3)].style.background = "#eee";
			}
			
		}
		
		//检测 是否完成
		function checkFinished(){
			var mytable = document.getElementById("sudokuTable");
			var finArr = new Array(9);
			for (var i = 0;i < finArr.length;i++) {
				finArr[i] = new Array(9);
			}
			for(var i = 0; i < 9; i++) 
				for(var j = 0; j < 9; j++) {
					if(!mytable.rows[i].cells[j].innerHTML){
						alert("第"+(i+1)+"行第"+(j+1)+"列没有填空");
						return;
					}
					finArr[i][j] = mytable.rows[i].cells[j].innerHTML;
			}
			for(var i = 0; i < 9; i++) {
				for(var j = 1; j <9; j++) {
					//分别找到3宫格，行和列已经存在的数字
					var centerXY = getCenter(i,j);
					var arr1 = get3Grid(centerXY[0],centerXY[1],finArr);
					var arr2 = isXRepeat(j,sudokuArr);
					var arr3 = isYRepeat(i,sudokuArr);
					//如果重复 
					if(countOccurences(arr1,finArr[i][j])>1 || countOccurences(arr2,finArr[i][j])>1 || countOccurences(arr3,finArr[i][j])>1) {
						alert("第"+(i+1)+"行第"+(j+1)+"列数字重复");
						return;
					}
				}
			}
			alert("胜利！完成数独");
			document.getElementById("btn_group").style.visibility="hidden"
			document.getElementById("btn_reset").style.visibility="visible"
		}
		
		//显示答案
		function showAnswer() {
			showTable();
			document.getElementById("btn_group").style.visibility="hidden"
			document.getElementById("btn_reset").style.visibility="visible"
		}
		
		//再玩一次按钮
		//function playAgain() {
			//get9Grid();
			//document.getElementById("btn_reset").style.visibility="hidden"
			//document.getElementById("btn_group").style.visibility="visible"
		//}
		
		//求出两个集合的差集
		Array.prototype.diff = function (arr) {
			return this.filter(function(i) {return arr.indexOf(i) < 0;});
		};
		//求出两个集合的并集
		Array.prototype.intersect = function (arr) {
			var a = this;
			return this.concat(arr.filter(function(i) {return !(a.indexOf(i) >-1);}));
		};
		//重复次数的函数
		const countOccurences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
		

