import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import Topic from './topic';
import PostTopic from './posttopic';

@Table({
  tableName: 'posts'
})
export default class Post extends Model<Post> {
  @Column
  public name!: string;

  @BelongsToMany(() => Topic, () => PostTopic)
  public topics!: Topic[];
}
