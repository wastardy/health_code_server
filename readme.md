# HealtCode API Documentation

## Base URL
The base URL for the HealthCode API is:

> **[https://health-code-server.onrender.com](https://health-code-server.onrender.com)**

---

## Test Connection

### GET `/api/test`
**Response Body:**
```json
{
    "message": "HealthCode API is up to use!",
    "timestamp": "2025-01-28T11:11:33.364Z",
    "status": "success"
}
```

---

## Authentication

### POST (login for testing) `/api/auth/dev_login`
**Description:** Logs in as a test user, setting an `accessToken` cookie to authenticate further API requests.
**Response:**
```json
{
    "message": "Test login successful",
    "jwtToken": "bla_bla_bla_token_xd"
}
```
**Notes:**

- This endpoint is for development and testing purposes only.
- The accessToken is stored in a cookie and must be sent with subsequent requests.

---

### POST (register user) `/api/auth/register`
**Request Body:**
```json
{
    "username": "andrew_",
    "email": "andrew@gmail.com",
    "password": "1",
    "name": "Andrew"
}
```
**Response Body:**
```json
{
    "message": "User registered successfully",
    "user_id": 6
}
```

### POST (login) `/api/auth/login`
**Request Body:**
```json
{
    "email": "qwerty@gmail.com",
    "password": "1"
}
```
**Response Body:**
```json
{
    "message": "Login successful",
    "jwtToken": "<JWT_TOKEN>",
    "user_id": 3,
    "email": "qwerty@gmail.com"
}
```

### POST (logout) `/api/auth/logout`
**Response Body:**
```json
{
    "message": "User logged out successfully"
}
```

---

## Posts

### GET (get posts) `/api/posts`
**Response Body:**
```json
{
    "count_posts": 4,
    "posts": [
        {
            "id": 4,
            "post_title": "That's like my big brother, man, I love KD",
            "post_description": null,
            "image": "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/vcpmmwnlrqq5m8ykoy0w",
            "video": null,
            "user_id": 4,
            "created_at": "2025-01-25T12:03:31.000Z",
            "User": {
                "id": 4,
                "name": "Anthony Edwards",
                "profile_image": "https://playerstv.com/wp-content/uploads/2024/02/GetPaidStock.com-65d3b9d9dc21e.jpg",
                "Relationships": []
            }
        }
    ]
}
```

### POST (create post) `/api/posts`
**Request Body:** 
```json
{
    // at least one of description, image, or video is required
    "title": "Test Post",
    "desc": "This is a description of test post.",
    "img": "https://example.com/image.jpg",
    "video": "https://example.com/video.mp4"
}
```
**Response:**
```text
Post has been created
```

### DELETE (delete post) `/api/posts/:post_id`
**Response:**
```text
Post has been deleted
```

---

## Likes

### GET (get likes) `/api/likes?post_id=2`
**Response Body:**
```json
{
    "count_likes": 5,
    "user_ids": [
        1,
        2,
        3,
        5,
        4
    ]
}
```

### POST (like post) `/api/likes`
**Request Body:**
```json
{
    "post_id": "2"
}
```
**Response:**
```text
Like has been added
```

### DELETE (remove like) `/api/likes/:post_id`
**Response:**
```text
Like has been removed
```

---

## Comments

### GET (get comments) `/api/comments?post_id=1`
**Response Body:**
```json
{
    "comments_count": 3,
    "comments": [
        {
            "id": 5,
            "description": "bla bla bla",
            "created_at": "2025-01-26T12:25:20.000Z",
            "user_id": 3,
            "post_id": 1,
            "User": {
                "id": 3,
                "name": "Qwerty User",
                "profile_image": null
            }
        },
    ]
}
```

### POST (add comment) `/api/comments`
**Request Body:**
```json
{
    "desc": "Test comment bla bla bla",
    "post_id": "2"
}
```
**Response Body:**
```json
{
    "message": "Comment has been created",
    "comment": {
        "id": 7,
        "description": "Test comment bla bla bla",
        "created_at": "2025-01-28T11:05:04.000Z",
        "user_id": 4,
        "post_id": "2"
    }
}
```

### DELETE (delete comment) `/api/comments/:comment_id`
**Response:**
```text
Comment has been deleted
```

---

## Shares

### GET (get shares) `/api/shares?post_id=1`
**Response Body:**
```json
{
    "count_shares": 4,
    "shares": [
        {
            "id": 4,
            "user_id": 5,
            "post_id": 1,
            "created_at": "2025-01-25T11:13:31.000Z",
            "User": {
                "id": 5,
                "name": "Stephe Shell",
                "profile_image": "https://images.stockcake.com/public/d/5/d/d5dd339d-4ab8-4f62-ae53-f7481672eea6_large/focused-soccer-coach-stockcake.jpg"
            }
        }
    ]
}
```

### POST (share post) `/api/shares`
**Request Body:**
```json
{
    "post_id": "2"
}
```
**Response Body:**
```json
{
    "message": "Post has been shared",
    "share": {
        "id": 7,
        "user_id": 4,
        "post_id": "2",
        "created_at": "2025-01-28T11:19:11.000Z"
    }
}
```

---

## Challenges

### GET (get list of challenges) `/api/challenges`
**Response Body:**
```json
{
    "count_challenges": 5,
    "challenges": [
        {
            "id": 4,
            "type": "sleep",
            "title": "Screen-Free Hour Before Bed",
            "description": "Turn off all screens one hour before bedtime. This improves your sleep quality by preparing your body for rest without distractions.",
            "start_date": "2025-01-26T19:00:00.000Z",
            "end_date": "2025-02-02T23:59:00.000Z",
            "status": "active",
            "created_at": "2025-01-26T18:12:31.000Z",
            "user_id": 3
        }
    ]
}
```

### POST (add challenge) `/api/challenges`
**Request Body:**
```json
{
    "type": "outdoor_activity",
    "title": "test challenge",
    "description": "asfasfasf asfaf XD)",
    "end_date": "2025-02-01T18:30:00.000Z"
}
```
**Response Body:**
```json
{
    "message": "Challenge added successfully!",
    "challenge": {
        "id": 8,
        "type": "outdoor_activity",
        "title": "test challenge",
        "description": "asfasfasf asfaf XD)",
        "start_date": null,
        "end_date": "2025-02-01T18:30:00.000Z",
        "status": "active",
        "created_at": "2025-01-28T11:28:39.000Z",
        "user_id": 4
    }
}
```

### DELETE (delete challenge) `/api/challenges/:challenge_id`
**Response Body:**
```text
Challenge deleted successfully!
```

---

## User

### GET (get user info e.g. for profile) `/api/users/:user_id`
**Response Body:**
```json
{
    "id": 4,
    "username": "theanthonyedwards_",
    "email": "ant@gmail.com",
    "name": "Anthony Edwards",
    "cover_image": "https://png.pngtree.com/thumb_back/fw800/background/20240522/pngtree-above-the-clouds-and-above-minneapolis-minnesota-from-airplane-image_15682301.jpg",
    "profile_image": "https://playerstv.com/wp-content/uploads/2024/02/GetPaidStock.com-65d3b9d9dc21e.jpg",
    "bio": null,
    "sex": "he/him",
    "age": 23,
    "weight": "102.00",
    "height": "193.00"
}
```

### PUT (update user info) `/api/users/:user_id`
**Request Body:**
```json
{
    // possible to change either 1 or all user fields
    "username": "updated_user",
    "email": "updated@example.com",
    "password": "228", // password will be hashed
    "name": "Updated User",
    "cover_image": "https://img.freepik.com/free-photo/high-angle-view-laptop-stationeries-blue-background_23-2147880456.jpg",
    "profile_image": "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    "bio": "sort of bio information bla bla bla XD)",
    "sex": "he/him",
    "age": "22",
    "weight": "75.5",
    "height": "180.3"
}
```
**Response Body:**
```json
{
    "message": "User profile has been updated",
    "updated_user_info": {
        "id": 2,
        "username": "updated_user",
        "email": "updated@example.com",
        "name": "Updated User",
        "cover_image": "https://img.freepik.com/free-photo/high-angle-view-laptop-stationeries-blue-background_23-2147880456.jpg",
        "profile_image": "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        "bio": "sort of bio information bla bla bla XD)",
        "sex": "he/him",
        "age": 22,
        "weight": "75.50",
        "height": "180.30"
    }
}
```

---

## Relationships

### GET (get followers) `/api/relationships?user_id=4`
**Response Body:**
```json
{
    "followers_count": 4,
    "followers": [
        5,
        1,
        3,
        2
    ]
}
```

### POST (follow user) `/api/relationships`
**Request Body:**
```json
{
    "user_id": "2"
}
```
**Response Body:**
```text
Relationship added successfully
```

### DELETE (unfollow user) `/api/relationships`
**Request Body:**
```json
{
    "user_id": "2"
}
```
**Response Body:**
```text
Relationship deleted successfully
```

---

## Diets

### GET (get diets) `/api/diets`
**Response Body:**
```json
{
    "diets_count": 9,
    "diets": [
        {
            "id": 9,
            "name": "Atkins diet",
            "description": "A low-carbohydrate diet that emphasizes protein and fat to induce weight loss.",
            "image": "https://media.post.rvohealth.io/wp-content/uploads/2020/09/atkins-diet-101-1200x628-facebook-1200x628.jpg"
        }, 
    ]
}
```

---

## Workout Categories

### GET (get workout categories) `/api/workout_categories`
**Response Body:**
```json
{ 
    "workout_categories_count": 10,
    "workout_categories": [
        {
            "id": 1,
            "title": "Yoga",
            "description": "Relaxing yoga sessions focusing on breathwork and stretching.",
            "image": "https://www.ekhartyoga.com/media/image/articles/Laia_Bove_Mermaid-pose.jpg",
            "duration": "30.00",
            "difficulty": "beginner"
        },
    ]
}
```

---

## Workouts

### GET (get workout suggestions) `/api/workouts`
**Response Body:**
```json
{
    "workouts_count": 7,
    "workouts": [
        {
            "id": 1,
            "title": "Jump Rope Session",
            "description": "A fun and intense jump rope workout for cardio lovers.",
            "image": "https://runningmagazine.ca/wp-content/uploads/2019/09/skip-2.jpg",
            "duration": "15.00",
            "category_id": 2
        },
    ]
}
```