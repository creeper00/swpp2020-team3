from django.urls import path
from recipick import views

# TODO: change url of ingredient_post and ingredient_list
urlpatterns = [
    path('signup/', views.signup, name='signup'),               # for /signup
    path('signin/', views.signin, name='signin'),               # for /signin
    path('signout', views.signout, name='signout'),
    path('getuser/<int:id>', views.getuser, name='getuser'),

    # for /create
    path('recipe/', views.recipe_post, name='recipe_post'),                         
    # for /search (get all recipes)
    path('recipepage/', views.recipe_page, name='recipe_page'),                     
    path('recipe/<int:id>/', views.recipe, name='recipe'),
    # for posting a comment
    path('recipe/<int:id>/comment/', views.recipe_comment, name='recipe_comment'),  
    
    # for posting an ingredient
    path('ingredient', views.ingredient_post, name='ingredient_post'),              
    # for getting, modifying, deleting an ingredient
    path('ingredient/<int:id>', views.ingredient, name='ingredient'),               
    # for getting ingredient list
    path('ingredient/', views.ingredient_list, name='ingredient_list'),             

    # for getting, modifying and deleting a comment
    path('comment/<int:id>/', views.comment, name='comment'),                       
    # for getting and posting a comment
    path('comment/<int:id>/reply/', views.comment_reply, name='comment_reply'),     
    # for getting, modifying and deleting a reply
    path('reply/<int:id>/', views.reply, name='reply'),                             
    
    # for getting a radomrecipe (mainpage)
    path('random/', views.randomrecipe, name='randomrecipe'),                       
    # for getting an image
    path('image/', views.image, name='image'),                                      

    path('token', views.token, name='token'),
]