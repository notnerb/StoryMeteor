import Butter from 'buttercms';
import './main.html';

const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd');

Router.route('/', function() {
  this.render("Home")
});

Router.route('/blog', async function() {
  const resp = await butter.post.list({page: 1, page_size: 10});
  this.render('Blog', {data: {posts: resp.data.data}});
});

Router.route('/blog/:slug', async function() {
  const slug = this.params.slug
  const resp = await butter.post.retrieve(slug);
  const post = resp.data.data
  this.render('Post', {data: {post: post}});
});
