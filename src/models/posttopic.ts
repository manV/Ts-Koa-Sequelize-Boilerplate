import {Model, Table, PrimaryKey, Column, ForeignKey} from "sequelize-typescript";
import Post from "./post";
import Topic from "./topic";

@Table({
  tableName: 'posttopic'
})
export default class PostTopic extends Model<PostTopic> {

  @ForeignKey(() => Post)
  @PrimaryKey
  @Column
  postId!: number;

  @ForeignKey(() => Topic)
  @PrimaryKey
  @Column
  topicId!: number;
}