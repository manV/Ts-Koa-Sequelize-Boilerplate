import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import PostTopic from './posttopic';
import Post from './post';

@Table({
  tableName: 'topics'
})
export default class Topic extends Model<Topic> {
  @Column
  name!: string;

  @BelongsToMany(() => Post, () => PostTopic)
  posts!: Post[]
}