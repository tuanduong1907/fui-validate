<h3>⚙️ Cài Đặt:</h3>
<p>Thêm FUI Validate JS vào trang HTML</p>
<ul>
  <li>Thêm file JS trước thẻ đóng <code>&lt;/body&gt;</code></li>
</ul>

<pre><code>&lt;script src="https://cdn.jsdelivr.net/gh/tuanduong1907/fui-validate@main/fui-validate.min.js"&gt;&lt;/script&gt;</code></pre>

## Example:

### Cấu trúc HTML form:

```html
<form id="form">
    <div class="form-group">
        <input type="text" id="fullname" name="fullname" placeholder="Nhập họ và tên..." />
        <p class="form-message"></p>
    </div>
    <div class="form-group">
        <input type="email" id="email" name="email" placeholder="Nhập địa chỉ email..." />
        <p class="form-message"></p>
    </div>
    <div class="form-group">
        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu..." />
        <p class="form-message"></p>
    </div>
    <button type="submit">Submit</button>
</form>
```
### Cách sử dụng (Gọi trong file JS):

<pre>
Validator({
    form: "#form",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
        Validator.isRequired("#fullname", "Vui lòng nhập tên đầy đủ của bạn"),
        Validator.isEmail("#email", "Vui lòng nhập email hợp lệ"),
        Validator.minLength("#password", 6, "Mật khẩu phải có ít nhất 6 ký tự"),
    ],
    onSubmit: function (data) {
        console.log(data);  // Dữ liệu form sau khi xác thực thành công
    },
});
</pre>

<h3>💡 Lưu ý:</h3>
<ul>
  <li><strong>form:</strong> Đây là <code>ID</code> của form mà bạn muốn xác thực. Đảm bảo rằng <code>ID</code> này đúng với <code>ID</code> trong HTML của bạn.</li>
  <li><strong>formGroupSelector:</strong> Sử dụng để chọn nhóm thẻ chứa các trường <code>input</code>. Điều này giúp dễ dàng quản lý và hiển thị thông báo lỗi tương ứng cho từng trường.</li>
  <li><strong>errorSelector:</strong> Xác định vị trí hiển thị thông báo lỗi. Đây là nơi mà thông báo xác thực sẽ xuất hiện khi có lỗi nhập liệu.</li>
</ul>

<h3>⚙️ Validation Rules:</h3>
<table>
  <thead>
    <tr>
      <th>Rules</th>
      <th>Sử Dụng</th>
      <th>Miêu Tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>isRequired</code></td>
      <td><code>Validator.isRequired("Selector", "Message")</code></td>
      <td>Kiểm tra xem trường có giá trị hay không. Nếu không, thông báo lỗi sẽ được hiển thị.</td>
    </tr>
    <tr>
      <td><code>isEmail</code></td>
      <td><code>Validator.isEmail("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị của trường có phải là một địa chỉ email hợp lệ hay không.</td>
    </tr>
    <tr>
      <td><code>minLength</code></td>
      <td><code>Validator.minLength("Selector", minLength(number), "Message")</code></td>
      <td>Kiểm tra xem độ dài của giá trị nhập vào có đạt yêu cầu tối thiểu hay không.</td>
    </tr>
    <tr>
      <td><code>isConfirmed</code></td>
      <td><code>Validator.isConfirmed("Selector", function() { return value; }, "Message")</code></td>
      <td>Kiểm tra xem giá trị nhập vào có khớp với giá trị của một trường khác (ví dụ: xác nhận mật khẩu).</td>
    </tr>
  </tbody>
</table>

<p>
  <strong>- Tham số Selector:</strong> Truyền vào <code>id</code> của thẻ <code>input</code> cần validate.<br />
  <strong>- Tham số Message:</strong> Tham số này không bắt buộc. Nếu không được cung cấp, hệ thống sẽ dùng thông báo mặc định.<br />
  <strong>- Tham số minLength(number):</strong> Chỉ áp dụng cho <code>Validator.minLength</code>, nếu không được cung cấp sẽ bỏ qua kiểm tra độ dài.<br />
  <strong>- Tham số function() { return value; }:</strong> Chỉ áp dụng cho <code>Validator.isConfirmed</code>. Hàm này trả về giá trị cần so sánh với trường khác.
</p>

<h3>📚 Ví dụ:</h3>

<ol>
  <li><strong>isRequired (Bắt buộc):</strong></li>
  <pre><code>Validator.isRequired("#fullname", "Vui lòng nhập tên đầy đủ của bạn");</code></pre>

  <li><strong>isEmail (Email Hợp Lệ):</strong></li>
  <pre><code>Validator.isEmail("#email", "Vui lòng nhập địa chỉ email hợp lệ");</code></pre>

  <li><strong>minLength (Độ Dài Tối Thiểu):</strong></li>
  <pre><code>Validator.minLength("#password", 6, "Mật khẩu phải có ít nhất 6 ký tự");</code></pre>

  <li><strong>isConfirmed (Xác Nhận):</strong></li>
  <pre><code>Validator.isConfirmed("#password", function() {
    return document.querySelector("#password-confirm").value;
  }, "Mật khẩu xác nhận không khớp");</code></pre>
</ol>
