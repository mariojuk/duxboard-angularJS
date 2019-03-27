sportApp.service('httpService', ['$http', function($http) {
    return {
	resendMail:function(email){ return $http.post('/api/auth/resendItNow/'+ email )},
      postPackage:function(id,package){ return  $http.post('/api/auth/register/'+ id +'/package', {package:package})},
      inviteFriends : function(email) { return $http.post('api/invitefriends', { email : email })},
	inviteGoogleFriends : function(listOfContacts) { return $http.post('api/invitefriends/googlecontacts', { listOfContacts : listOfContacts })},
      getUser : function(id) { return $http.get('api/profile/' + id)},
      searchUsers : function(user) { return $http.get('api/search', { params: { user : user } }) },
      getPreorder : function(){ return $http.get('/api/admin/preorders')},
      postAdminEmails : function(receipents,emailText,subject) { return $http.post('api/admin/sendEmails', { receipents : receipents ,emailText : emailText,subject : subject})},
      
      getHome : function(){ return $http.get('/api/home')},
      getFeed : function (ps, last) { return $http.get('/api/home/feed', { params: { postId: last, pageSize : ps || 10} } )},
      getUserFeed : function (id, ps, next) { return $http.get('/api/profile/'+ id +'/feed', { params: {nextId: next, pageSize : ps || 10} } )},

      getNotificationFeed : function(){ return $http.get('/api/activity/feed')},
      getUserActivity : function(){ return $http.get('/api/activity/')},
      
      getMostLikedStatus : function(limit){ return $http.get('/api/analysis/status/mostliked', {params: {limit: limit}})},
      getMostCommentedStatus : function(limit){ return $http.get('/api/analysis/status/mostcommented', {params: {limit: limit}})},
      getMostSeenStatus : function(limit){ return $http.get('/api/analysis/status/mostseen', {params: {limit: limit}})},
      getMostSharedStatus : function(limit){ return $http.get('/api/analysis/status/mostshared', {params: {limit: limit}})},
      getMostLikedArticle : function(limit){ return $http.get('/api/analysis/article/mostliked', {params: {limit: limit}})},
      getMostCommentedArticle : function(limit){ return $http.get('/api/analysis/article/mostcommented', {params: {limit: limit}})},
      getMostSeenArticle : function(limit){ return $http.get('/api/analysis/article/mostseen', {params: {limit: limit}})},
      getMostSharedArticle : function(limit){ return $http.get('/api/analysis/article/mostshared', {params: {limit: limit}})},

      getMedalsSinceDate: function(date){ return $http.get('/api/analysis/medals/feed', {params: {date: date}})},
      getMedalsByDays : function(days){ return $http.get('/api/analysis/medals/feed', {params: {days: days}})},
      getMedalsCount : function(date){ return $http.get('/api/analysis/medals/count', {params: {date: date}})},

      getUserDetails: function (id) {return $http.get('api/profile/'+id+'/about/')},
      getArticle : function(id,userId){ return $http.get('/api/article/' + id +'/' + userId )},
      getArticleLikes : function(id, ps, last) { return  $http.get('/api/article/' + id + '/likes', { params: { lastId: last, pageSize : ps || 10} } )},
      deleteArticle : function (id) { return $http.delete('/api/article/' + id) },
      likeArticle : function (id) { return $http.post('/api/article/' + id + '/like') },
      shareArticle : function (id, text) { return $http.post('/api/article/' + id + '/share', { text: text }) },
      unlikeArticle : function (id) { return $http.post('/api/article/' + id + '/unlike') },
      postArticleComment : function (id, text) { return $http.post('/api/article/' + id + '/comment', { text : text })},
      deleteArticleComment : function (id, commentId) { return $http.delete('/api/article/' + id + '/comment/' + commentId)},

      getUSerProfileMedia: function(id){return $http.get('api/profile/'+id+'/profileMedias')},
      deleteProfileMedia: function(uid, pictureId){ return $http.delete('/api/profile/' + uid + '/profileMedias/' + pictureId) },

       getArticlesFeed : function (ps, last) { return $http.get('/api/article/feed', { params: { postId: last, pageSize : ps || 10} } )},
      getUserArticles: function (userId) { return $http.get('api/profile/' + userId + "/articles") },

      getLiveWebinars : function(){ return $http.get('/api/webinars/live')},
      getArchivedWebinars : function(){ return $http.get('/api/webinars/archived')},

      postConsultingQuestion : function(question){ return $http.post('/api/consulting', question)},

      //postStatus : function (text) { return $http.post('/api/status', { text : text })},
      getStatus : function (id) { return $http.get('/api/status/' + id) },
      getStatusLikes : function(id, ps, last) { return  $http.get('/api/status/' + id + '/likes', { params: { lastId: last, pageSize : ps || 10} } )},
      deleteStatus : function (id) { return $http.delete('/api/status/' + id) },
      likeStatus : function (id) { return $http.post('/api/status/' + id + '/like') },
      shareStatus : function (id, text) { return $http.post('/api/status/' + id + '/share', { text: text }) },
      unlikeStatus : function (id) { return $http.post('/api/status/' + id + '/unlike') },
      postComment : function (id, text) { return $http.post('/api/status/' + id + '/comment', { text : text })},
      deleteComment : function (id, commentId) { return $http.delete('/api/status/' + id + '/comment/' + commentId)},

      requestPartner    : function (id) { return $http.post('/api/partner/' + id + '/request')},
      acceptPartner : function (id) { return $http.post('/api/partner/' + id + '/accept')},
      denyPartner   : function (id) { return $http.post('/api/partner/' + id + '/deny' )},
      cancelPartner : function (id) { return $http.post('/api/partner/' + id + '/cancel')},
      removePartner : function (id) { return $http.post('/api/partner/' + id + '/remove')},
      getPartners : function(id, ps, next){ return $http.get('/api/partner/' + id, { params: {nextId: next, pageSize : ps || 10} } )},
      getMutualPartners : function (id) { return $http.get('/api/partner/' + id + '/mutual')},
      getPeopleYouMayKnow : function() { return $http.get('/api/partner/mayknow') },
      getRequests : function(ps, next){ return $http.get('/api/partner/requests', { params: {nextId: next, pageSize : ps || 10} } )},
      getPendingRequests : function(){ return $http.get('/api/partner/pending')},


      newConversation : function (rec, text) { return $http.post('/api/message', { recipients: rec, text : text })},
      getConversations : function () { return $http.get('/api/message') },
      getConversationMessages : function(id, ps, last) { return $http.get('/api/message/' + id, { params: { lastId: last, pageSize: ps || 20 }}) },
      //settings
      getUserCreditCardInfo : function(){ return $http.get('api/settings/creditCardInformation')},
      postUserCreditCardInfo: function (cardInfo) {return $http.post('/api/settings/creditCard', cardInfo)},
      getwhoCanSee : function(){ return $http.get('api/settings/whoCanSee')},
      postWhoCanSee:function (whocansee) {return $http.post('/api/settings/whoCanSee', whocansee )},

      getChangeEmail:function (token) {return $http.get('/api/settings/changeEmail/'+token)},
      getChangePasswordSettings:function (token) {return $http.get('/api/settings/changePassword/'+token)},
      deleteUnblockUser:function (id) {return $http.delete('/api/settings/unblockUser/'+id)},
      getBlockUser:function (id,explanation) {return $http.get('/api/settings/blockUser/'+id+'/'+explanation)},
      postTerminateAccount:function (model) {return $http.post('/api/settings/terminateAccount',model)},
      getTerminateAccount:function (model) {return $http.get('/api/settings/terminateAccount/'+model)},

      getFreeAgentBanner:function () {return $http.get('/api/freeagent/a-z')},
      getMyBanners:function () {return $http.get('/api/freeagent/myBanners')},
      deleteFreeAgentBanner:function (id) {return $http.delete('/api/freeagent/'+id)},
      editFreeAgentBanner:function(model){return $http.put('api/freeagent/'+model._id, model)},
      getSportFreeAgent:function (id) {return $http.get('/api/freeagent/'+id)},

      getBlockedUsersList:function () {return $http.get('api/settings/myBlockList')},
    };
}]);