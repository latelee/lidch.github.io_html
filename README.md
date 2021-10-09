# xxx个人主页模板

1、参考模板修改：https://github.com/Gabriel-Chen/Nice_Blog 

2、模板仅有页面，没有归档文件。

3、默认不让搜索引擎搜索到本网站。

# 规划
latelee仓库存储源码文件，https://github.com/lidch/lidch.github.io 存在生成好的文件。

# 后记

现在用的版本找不到模板了。  

构建：
```
bundle exec jekyll b
```

直接运行服务：  
```
bundle exec jekyll serve -H 0.0.0.0 -P 8080
```

注：有时直接运行图片不显示，一终端构建，如：
```
bundle exec jekyll b --watch
```

另一终端用 goweb 运行，示例：
```
./goweb.exe -m website -d _site/ -p 8080
```
这样，一边修改，另一边刷新浏览器即可看到效果。  

# 其它

批量编辑图片文件。

用`ls -r`倒排序图片，复制到记事本，使用已有的样例替换前后，再复制到图片页面中。  