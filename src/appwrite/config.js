import { Client, ID, Databases } from 'appwrite';
import conf from './conf/conf.js';

export class Service{
    client = new Client();
    databases;
    bucket;

    // constructor is ready to use
    constructor() {
        this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            console.log("APPWRITE SERVICE ERROR: create post error", error)
        }
    }

    async updatePost(slug, {title,  content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                    }
                )


            )
            
        } catch (error) {
            console.log("APPWRITE SERVICE ERROR: update post error", error)
            
        }

    }

    async deletePost(slug) {
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch(error) {
            console.log("APPWRITE SERVICE ERROR: delete post error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("APPWRITE SERVICE ERROR: get post error", error)
            return false
        }

    }
    // eslint-disable-next-line no-undef
    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
            
        } catch (error) {
            console.log("APPWRITE SERVICE ERROR: get posts error", error)
            return false
            
        }

    }

    // file upload service
    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.appWriteStorageId,
                ID.unique(),
                file
            );
            
        } catch (error) {
            console.log("APPWRITE SERVICE ERROR: upload file error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteStorageId,
                fileId
            )
        } catch (error) {
            console.log("APPWRITE SERVICE ERROR: delete file error", error)
            return false;
            
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteStorageId,
            fileId
        )
    }

}

const service = new Service();  

export default service