const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0;

    for (let i = 0; i < blogs.length; i++){
        total += blogs[i].likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let favBlog = [];
    let max = 0

    for (let i = 0; i < blogs.length; i++){
        if (blogs[i].likes > max){
            max = blogs[i].likes
            favBlog = blogs[i]
        }
    }
    return favBlog
}
const mostBlogs = (blogs) => {
    let total = 1
    let current = 0
    let topItem = []

    for (let i = 0; i < blogs.length; i++) {
        for (let j = i; j < blogs.length; j++) {
            if (blogs[i].author === blogs[j].author) {
                current++
                if (total < current) {
                    total = current
                    topItem = blogs[i]
                }
            }
        }
        current = 0
    }
    return (topItem.author + " " + total)
}


const mostLikes = (blogs) => {

}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}