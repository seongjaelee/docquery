let fs = require("fs")
let tilde = require("tilde-expansion")
let path = require("path")
let lunr = require("lunr")

class DocQuery {
  constructor(directoryPath, options) {
    this.options = options || {}
    this.extensions = [".md"]
    this.directoryPath = directoryPath
    this._documents = {}
    this.searchIndex = lunr(function() {
      this.field("title", { boost: 10 })
      this.field("body")
    })
    this.loadDocuments(directoryPath)
  }

  loadDocuments(directoryPath) {
    var self = this

    tilde(directoryPath, (expandedPath)=>{
      var fileNames = fs.readdirSync(expandedPath)
      for(let fileName of fileNames) {
        var extension = path.extname(fileName)
        var filePath = `${expandedPath}/${fileName}`
        var stats = fs.statSync(filePath)

        if(stats.isDirectory() && self.options.recursive) {
          self.loadDocuments(filePath)
        }else if(self.extensions.find(x => x == extension)) {
          var title = fileName.replace(new RegExp(`${extension}$`), "")
          var body = fs.readFileSync(filePath, {encoding: "utf8"})

          self._documents[filePath] = {
            filePath: filePath,
            fileName: fileName,
            title: title,
            modifiedAt: stats.mtime,
            body: body
          }

          self.searchIndex.add({
            id: filePath,
            title: title,
            body: body
          })
        }
      }
    })
  }

  search(query) {
    var self = this

    return self.searchIndex.search(query).map((result)=>{
      return self._documents[result.ref]
    })
  }

  get documents() {
    var documents = []
    for(let key in this._documents) {
      documents.push(this._documents[key])
    }
    return documents.sort((a, b)=>{
      if(a.modifiedAt < b.modifiedAt) return 1
      if(a.modifiedAt > b.modifiedAt) return -1
      return 0
    })
  }
}

module.exports = DocQuery
