const queryCategory = {
    getAll: (limit, page) => {
        return `SELECT *
                FROM 
                categories
                LIMIT ${limit} 
                OFFSET ${(page - 1) * limit}`
    },

    getById: (id) => {
        return `SELECT * 
                FROM categories 
                WHERE id = ${id}`
    },

    deleteById: (id) => {
        return `DELETE 
                FROM categories 
                WHERE id = ${id} 
                RETURNING *`
    },

    getCategoryNameById: (id) => {
        return `SELECT category_name 
                FROM categories 
                WHERE id=${id}`
    },

    getCategoryListByName: (category_name) => {
        return `SELECT * 
                FROM categories 
                WHERE LOWER(category_name)='${category_name.toLowerCase()}'`
    },

    getArticles: (limit, page, id) => {
        return `SELECT a.id, a.category_id, c.category_name, a.author_id, 
                u.name, a.article_cover, a.article_title, a.article_cover, 
                a.article_content, a.publish_date, a.created_at, a.updated_at
                FROM articles as a 
                JOIN users as u ON a.author_id = u.id 
                JOIN categories as c ON a.category_id = c.id 
                WHERE a.category_id = ${id} 
                AND a.publish_date IS NOT NULL 
                ORDER BY a.publish_date DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`
    },

    getRecommendedArticle: (limit, id) => {
        return `SELECT a.id, a.category_id, c.category_name, a.author_id, 
                u.name, a.article_cover, a.article_title, a.article_cover, 
                a.article_content, a.publish_date, a.created_at, a.updated_at
                FROM articles as a 
                JOIN users as u ON a.author_id = u.id 
                JOIN categories as c ON a.category_id = c.id 
                WHERE a.category_id = ${id} AND a.publish_date IS NOT NULL 
                ORDER BY a.publish_date DESC LIMIT ${limit}`
    },

    createCategory: (category_name, photos) => {
        return `INSERT INTO categories(category_name,category_cover,created_at)
                VALUES('${category_name}', '/upload/category_cover/${photos}','now()') 
                RETURNING *`
    }


}

module.exports = queryCategory