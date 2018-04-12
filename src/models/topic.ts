import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import PostTopic from './posttopic';
import Post from './post';

@Table({
  tableName: 'topics'
})
export default class Topic extends Model<Topic> {
  @Column
  public name!: string;

  @BelongsToMany(() => Post, () => PostTopic)
  public posts!: Post[];
}
